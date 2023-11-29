import supabase from "./supabase";

// async function getRequests() {
//   const res = await fetch("http://localhost:8000/demanders");
//   const data = await res.json();
//   return data;
// }

// export default getRequests;

async function getProducts(requesterId) {
  let { data: requesterProduct, error } = await supabase
    .from("requesterProduct")
    .select("*")
    .eq("requesterId", requesterId);
  return requesterProduct;
}

async function getRequests() {
  let { data: requester } = await supabase.from("requester").select("*");
  const promises = requester.map(async (item) => {
    const products = await getProducts(item.id);
    return { ...item, products };
  });

  const finalData = await Promise.all(promises);
  return finalData;
}

export default getRequests;
