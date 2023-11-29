import supabase from "./supabase";

// async function getSuppliers() {
//   const res = await fetch("http://localhost:8000/suppliers");
//   const data = await res.json();
//   return data;
// }

// export default getSuppliers;

async function getSupplyById(supplierId) {
  let { data: supplierProduct, error } = await supabase
    .from("supplierProduct")
    .select("*")
    .eq("supplierId", supplierId);
  return supplierProduct;
}

async function getSuppliers() {
  let { data: supplier, error } = await supabase.from("supplier").select("*");
  const promises = supplier.map(async (item) => {
    const products = await getSupplyById(item.id);
    return { ...item, products };
  });

  const finalData = await Promise.all(promises);
  return finalData;
}

export default getSuppliers;
