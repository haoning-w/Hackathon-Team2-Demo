import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// external api
async function addressToCoords(address) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?country=CA&access_token=pk.eyJ1IjoiaGFvbmluZy13IiwiYSI6ImNscDdsdzFqMjBtY2EyanFwdGU2dm1mMWMifQ._UUo7gy9CQSYwYlRpnWEIw`;
  const res = await fetch(url);
  const data = res.json();
  return data;
}

// 1. find all suppliers
app.get("/suppliers", async (req, res) => {
  const allSuppliers = await prisma.supplier.findMany({
    include: {
      // Include the project information
      products: true,
    },
  });

  const promises = allSuppliers.map(async (supplier) => {
    const coords = await addressToCoords(supplier.address);
    // Return a new object with the original demander data and the coords
    return { ...supplier, coords };
  });

  // Use Promise.all to wait for all promises to resolve
  const suppliersWithCoords = await Promise.all(promises);

  const finalData = suppliersWithCoords.map((item, ind) => ({
    ...item,
    latlng: {
      lat: item.coords.features[0].geometry.coordinates[1],
      lng: item.coords.features[0].geometry.coordinates[0],
    },
  }));

  res.json(finalData);
});

// 2. create a new supplier (with at least one product)
app.post("/supplier", async (req, res) => {
  const { email, organizationName, address, products } = req.body;

  try {
    let supplier = await prisma.supplier.findUnique({
      where: { email: email },
    });

    if (supplier) {
      // Supplier exists, so update their product list
      await Promise.all(
        products.map(async (product) => {
          await prisma.supplierProduct.create({
            data: {
              ...product,
              historicalQuantity: product.quantity, // Set historicalQuantity to the initial quantity
              supplierId: supplier.id,
            },
          });
        })
      );
      supplier = await prisma.supplier.findUnique({
        where: { email: email },
        include: { products: true },
      });
    } else {
      // Supplier does not exist, create a new one with products
      supplier = await prisma.supplier.create({
        data: {
          email,
          organizationName,
          address,
          products: {
            create: products.map((product) => ({
              ...product,
              historicalQuantity: product.quantity, // Set historicalQuantity to the initial quantity
            })),
          },
        },
        include: {
          products: true,
        },
      });
    }

    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).send("Error processing supplier: " + error.message);
  }
});

// 3. find all demanders
app.get("/demanders", async (req, res) => {
  const allDemanders = await prisma.demander.findMany({
    include: {
      // Include the project information
      products: true,
    },
  });

  const promises = allDemanders.map(async (demander) => {
    const coords = await addressToCoords(demander.address);
    // Return a new object with the original demander data and the coords
    return { ...demander, coords };
  });

  // Use Promise.all to wait for all promises to resolve
  const demandersWithCoords = await Promise.all(promises);
  // demandersWithCoords.forEach((item, ind) =>
  //   console.log(item.email, item.id, item.coords.features[0].geometry)
  // );
  // res.json(demandersWithCoords);
  const finalData = demandersWithCoords.map((item, ind) => ({
    ...item,
    latlng: {
      lat: item.coords.features[0].geometry.coordinates[1],
      lng: item.coords.features[0].geometry.coordinates[0],
    },
  }));

  res.json(finalData);
});

// 4. create a new demander (with at least one product)
app.post("/demander", async (req, res) => {
  const { email, organizationName, address, products } = req.body;

  try {
    // Check if a supplier with the given email already exists
    let demander = await prisma.demander.findUnique({
      where: { email: email },
    });

    if (demander) {
      // Supplier exists, so update their product list
      await Promise.all(
        products.map(async (product) => {
          await prisma.demanderProduct.create({
            data: {
              ...product,
              historicalQuantity: product.quantity,
              demanderId: demander.id,
            },
          });
        })
      );
      demander = await prisma.demander.findUnique({
        where: { email: email },
        include: { products: true },
      });
    } else {
      // demander does not exist, create a new one
      demander = await prisma.demander.create({
        data: {
          email,
          organizationName,
          address,
          products: {
            create: products.map((product) => ({
              ...product,
              historicalQuantity: product.quantity, // Set historicalQuantity to the initial quantity
            })),
          },
        },
        include: {
          products: true,
        },
      });
    }

    res.status(201).json(demander);
  } catch (error) {
    res.status(500).send("Error processing supplier: " + error.message);
  }
});

// 5. find the supplier by email
app.get("/supplier/:email", async (req, res) => {
  const email = req.params.email;
  const supplier = await prisma.supplier.findUnique({
    where: {
      email: email,
    },
    include: {
      // Include the project information
      products: true,
    },
  });
  res.json(supplier);
});

// 6. find the demander by email
app.get("/demander/:email", async (req, res) => {
  const email = req.params.email;
  const demander = await prisma.demander.findUnique({
    where: {
      email: email,
    },
    include: {
      // Include the project information
      products: true,
    },
  });
  res.json(demander);
});

// 7. get supplierProduct by id
app.get("/sproduct/:id", async (req, res) => {
  const supplierProductID = parseInt(req.params.id);
  const post = await prisma.supplierProduct.findUnique({
    where: {
      id: supplierProductID,
    },
    include: {
      supplier: true,
    },
  });

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "supplierProduct not found" });
  }
});

// 8. update the quantity of supplierProduct
app.put("/sproduct/:id", async (req, res) => {
  const supplierProductId = parseInt(req.params.id);
  const { newQuantity } = req.body;
  try {
    const updatedProduct = await prisma.supplierProduct.update({
      where: {
        id: supplierProductId,
      },
      data: {
        quantity: newQuantity,
      },
    });

    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "SupplierProduct not found" });
    }
  } catch (error) {
    res.status(500).send("Error updating SupplierProduct: " + error.message);
  }
});

// 9. get demanderProduct by id
app.get("/dproduct/:id", async (req, res) => {
  const demanderProductID = parseInt(req.params.id);
  const post = await prisma.supplierProduct.findUnique({
    where: {
      id: demanderProductID,
    },
    include: {
      supplier: true,
    },
  });

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "demanderProduct not found" });
  }
});

// 10. update the quantity of demanderProduct
app.put("/dproduct/:id", async (req, res) => {
  const demanderProduct = parseInt(req.params.id);
  const { newQuantity } = req.body;

  // {
  // "newQuantity": 10
  // }

  try {
    const updatedProduct = await prisma.demanderProduct.update({
      where: {
        id: demanderProduct,
      },
      data: {
        quantity: newQuantity,
      },
    });

    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "DemanderProduct not found" });
    }
  } catch (error) {
    res.status(500).send("Error updating SupplierProduct: " + error.message);
  }
});

// 11. fetch supplier's annual data
app.get("/supplier-products/yearly-summary", async (req, res) => {
  const year = parseInt(req.query.year);

  // for front-end:
  // The URL might look something like this:
  // http://yourserver.com/api/supplier-products/yearly-summary?year=2023

  try {
    const summary = await getSupplierYearlySummary(year);
    res.json(summary);
  } catch (error) {
    res.status(500).send("Error fetching yearly summary: " + error.message);
  }
});

// 11 helper function
async function getSupplierYearlySummary(year) {
  const startDate = new Date(year, 0, 1); // January 1st of the year
  const endDate = new Date(year + 1, 0, 1); // January 1st of the next year

  return await prisma.supplierProduct.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      supplier: {
        select: {
          // show supplier's id and name
          id: true,
          organizationName: true,
        },
      },
      // show products info
      productName: true,
      totalPrice: true,
      historicalQuantity: true,
    },
  });
}

// 12. fetch demander's annual data
app.get("/demander-products/yearly-summary", async (req, res) => {
  const year = parseInt(req.query.year);

  try {
    const summary = await getDemanderYearlySummary(year);
    res.json(summary);
  } catch (error) {
    res.status(500).send("Error fetching yearly summary: " + error.message);
  }
});

// 12 helper function
async function getDemanderYearlySummary(year) {
  const startDate = new Date(year, 0, 1); // January 1st of the year
  const endDate = new Date(year + 1, 0, 1); // January 1st of the next year

  return await prisma.demanderProduct.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      demander: {
        select: {
          // show demander's id and name
          id: true,
          organizationName: true,
        },
      },
      // show products info
      productName: true,
      totalPrice: true,
      historicalQuantity: true,
    },
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🎉 🚀`);
});
