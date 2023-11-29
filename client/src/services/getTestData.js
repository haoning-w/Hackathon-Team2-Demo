export async function getTestData() {
  const res = await fetch("https://httpbin.org/delay/2");
  const data = await res.json();
  return data;
}
