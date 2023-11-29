export default async function addressToCoords(address) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?country=CA&access_token=${
    import.meta.env.VITE_MAP_TOKEN
  }`;
  const res = await fetch(url);
  const data = res.json();
  return data;
}
