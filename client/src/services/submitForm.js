import supabase from "./supabase";

const bbox = [-139.06, 48.3, -114.03, 60.0];

async function submitForm(roleName, roleData, productsData) {
  let { data: existingRole } = await supabase
    .from(roleName)
    .select("*")
    .eq("email", roleData.email);

  if (existingRole.length === 0) {
    const latlngRes = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        roleData.address
      }.json?access_token=${import.meta.env.VITE_MAP_TOKEN}&bbox=${bbox.join(
        ","
      )}`
    );
    const latlngRaw = await latlngRes.json();
    const latlng = {
      lat: latlngRaw.features[0].center[1],
      lng: latlngRaw.features[0].center[0],
    };
    const { data } = await supabase
      .from(roleName)
      .insert([{ ...roleData, latlng }])
      .select();
    existingRole = data;
  }
  const roleId = existingRole[0].id;

  const finalData = productsData.map((item) => ({
    ...item,
    [`${roleName}Id`]: roleId,
  }));

  const { data: submittedData, error } = await supabase
    .from(`${roleName}Product`)
    .insert(finalData)
    .select();
  return submittedData;
}

export default submitForm;
