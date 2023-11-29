async function getDemanders() {
    const res = await fetch("http://localhost:8000/demanders");
    const data = await res.json();
    return data;
  }
  
  export default getDemanders;
  