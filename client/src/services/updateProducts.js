export async function updateSupplierProducts(id, newQuantity) {
  const res = await fetch(`http://localhost:8000/sproduct/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newQuantity: newQuantity }),
  });
  const data = await res.json();
  return data;
}

export async function updateRequesterProducts(id, newQuantity) {
  const res = await fetch(`http://localhost:8000/dproduct/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newQuantity: newQuantity }),
  });
  const data = await res.json();
  return data;
}
