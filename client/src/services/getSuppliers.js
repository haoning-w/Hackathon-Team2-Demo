async function getSuppliers() {
  const res = await fetch("http://localhost:8000/suppliers");
  const data = await res.json();
  return data;
}

export default getSuppliers;
