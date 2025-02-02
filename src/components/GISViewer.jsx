import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import bbox from "@turf/bbox"; 
import { GIS_LAYERS } from "../constants/GISLayers";
import "mapbox-gl/dist/mapbox-gl.css";

export default function GISViewer({ map, onClose }) {
  if (!map) return null;

  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    if (mapRef.current) return; // Prevent duplicate initialization

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      zoom: 5,
      interactive: true, // Allows pan & zoom
    });

    mapRef.current.on("load", () => {
      // Add GeoJSON Source
      if (!mapRef.current.getSource("geojson-layer")) { // Prevent duplicate
        mapRef.current.addSource("geojson-layer", {
          type: "geojson",
          data: map,
        });
      }

      // Compute bounding box using Turf.js
      const bounds = bbox(map);
      mapRef.current.fitBounds(bounds, { padding: 50, maxZoom: 10 });

      // Function to add layers dynamically
      const addLayer = (id, type, paint, filter) => {
        if (!mapRef.current.getLayer(id)) {
          mapRef.current.addLayer({
            id,
            type,
            source: "geojson-layer",
            paint,
            filter,
          });
        }
      };

      // Add layers dynamically
      GIS_LAYERS.forEach(({ id, type, paint, filter }) => addLayer(id, type, paint, filter));

      // Add markers
      const pointFeatures = map.features.filter((f) => f.geometry.type === "Point");

      pointFeatures.forEach((feature) => {
        new mapboxgl.Marker()
          .setLngLat(feature.geometry.coordinates)
          .addTo(mapRef.current);
      });
    });
  }, [map]);

  return (
    <div
      style={{ height: "100%" }}
      ref={mapContainerRef}
      className="map-container"
      data-viewer-type="gis"
    />
  );
}
