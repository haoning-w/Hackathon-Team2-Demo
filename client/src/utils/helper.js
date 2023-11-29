export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export function dataToCoords(data) {
  return {
    lat: data.features[0].geometry.coordinates[1],
    lng: data.features[0].geometry.coordinates[0],
  };
}

export function transformData(originalData) {
  return originalData.map((item) => {
    return {
      id: String(item.id),
      name: item.organizationName,
      address: item.address,
      products: item.products.map((product) => ({
        name: product.productName,
        quantity: product.quantity,
      })),
      latlng: item.latlng,
      timeStamp: new Date(item.products[0]?.createdAt).toLocaleString(),
    };
  });
}

export function productAmount(item) {
  return item.products.reduce((acc, cur) => acc + cur.quantity, 0);
}

export function limitStrLen(str, len) {
  if (str.length <= len) {
    return str;
  }
  return str.slice(0, len) + "...";
}
