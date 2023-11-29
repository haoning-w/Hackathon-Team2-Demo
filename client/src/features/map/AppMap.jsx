import { useEffect, useRef } from "react";
import { Marker, Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGetRequests from "../requests/useGetRequests";
import useGetSuppliers from "./useGetSuppliers";
import { productAmount } from "../../utils/helper";

const AppMap = () => {
  const { data: allRequests, isLoading: isLoadingRequests } = useGetRequests();
  const { data: allSupplies, isLoading: isLoadingSupplies } = useGetSuppliers();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mapRef = useRef(null);

  // const { data: coords, isLoading } = useGetCoords("4500 Still Creek Dr");
  // if (!isLoading) console.log(coords.features[0].center);

  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));

  useEffect(() => {
    if (mapRef.current && !isNaN(lat) && !isNaN(lng)) {
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 12,
      });
    }
  }, [lat, lng]);

  if (isLoadingRequests || isLoadingSupplies) return null;

  const MAPBOX_TOKEN = import.meta.env.VITE_MAP_TOKEN;

  return (
    <div className="w-[100%] absolute inset-0 mb-24">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -123.11441917777452,
          latitude: 49.25968372351764,
          zoom: 12,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {allRequests.map((item, index) =>
          productAmount(item) > 0 ? (
            <Marker
              key={index}
              longitude={item.latlng.lng}
              latitude={item.latlng.lat}
            >
              <div
                onClick={() =>
                  navigate(
                    `requests/${item.id}?lat=${item.latlng.lat}&lng=${item.latlng.lng}&form=request`
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <LocationOnRoundedIcon
                  style={{ color: "#f87171", fontSize: "48px" }}
                />
              </div>
            </Marker>
          ) : null
        )}
        {allSupplies.map((item, index) =>
          productAmount(item) > 0 ? (
            <Marker
              key={index}
              longitude={item.latlng.lng}
              latitude={item.latlng.lat}
            >
              <div
                onClick={() =>
                  navigate(
                    `supplies/${item.id}?lat=${item.latlng.lat}&lng=${item.latlng.lng}&form=supply`
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <LocationOnRoundedIcon
                  style={{ color: "#2563eb", fontSize: "48px" }}
                />
              </div>
            </Marker>
          ) : null
        )}
      </Map>
    </div>
  );
};

export default AppMap;
