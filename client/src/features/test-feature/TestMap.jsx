import React, { useState, useEffect } from "react";
import MapGL, { Marker, Popup, Source, Layer, Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaGFvbmluZy13IiwiYSI6ImNscDdsdzFqMjBtY2EyanFwdGU2dm1mMWMifQ._UUo7gy9CQSYwYlRpnWEIw"; // Replace with your Mapbox access token

const TestMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 49.2827,
    longitude: -123.1207,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  });

  const [route, setRoute] = useState(null);

  const startCoord = [-123.121, 49.282]; // Starting marker coordinates
  const endCoord = [-123.13, 49.28]; // Ending marker coordinates

  useEffect(() => {
    // Fetch route from Mapbox Directions API
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoord[0]},${startCoord[1]};${endCoord[0]},${endCoord[1]}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRoute(data.routes[0].geometry);
      });
  }, []);

  return (
    <Map
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
      interactive={true}
      dragPan={true}
      onMove={(e) => setViewport(e.viewState)}
    >
      {/* Markers */}
      <Marker longitude={startCoord[0]} latitude={startCoord[1]} />
      <Marker longitude={endCoord[0]} latitude={endCoord[1]} />

      {/* Route Line */}
      {route && (
        <Source id="route" type="geojson" data={route}>
          <Layer
            id="route"
            type="line"
            source="route"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "#888",
              "line-width": 8,
            }}
          />
        </Source>
      )}
    </Map>
  );
};

export default TestMap;
