import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import bbox from "@turf/bbox";
import { GIS_LAYERS } from "../constants/GISLayers";
import "mapbox-gl/dist/mapbox-gl.css";
import classes from "./GISViewer.module.css";
import ToggleHeaderButton from "./ToggleHeaderButton";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { createRoot } from "react-dom/client";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";

import { useUIContext } from "../context/UIContext";

export default function GISViewer({ map, onClose }) {
  if (!map) return null;

  const { setViewerActive, isHeaderVisible } = useUIContext();

  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    if (mapRef.current) return; // Prevent duplicate initialization

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11", // This map is 2D, can remove to go back to 3D
      zoom: 5,
      interactive: true, // Allows pan & zoom
      // pitch: 0,
    });

    mapRef.current.on("load", () => {
      // Add GeoJSON Source
      if (!mapRef.current.getSource("geojson-layer")) {
        // Prevent duplicate
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
      GIS_LAYERS.forEach(({ id, type, paint, filter }) =>
        addLayer(id, type, paint, filter)
      );

      // Add markers
      const pointFeatures = map.features.filter(
        (f) => f.geometry.type === "Point"
      );

      pointFeatures.forEach((feature) => {
        const coordinates = feature.geometry.coordinates;

        const description = feature.properties.description || "No description";
        const tags = feature.properties.tags
          ? feature.properties.tags.join(", ")
          : "No tags";

        // Create a popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<p><strong>Coordinates:</strong> ${coordinates.join(", ")}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Tags:</strong> ${tags}</p>`
        );

        // Create a custom marker element.
        const el = document.createElement("div");
        el.className = classes.customMarker;

        const root = createRoot(el);
        root.render(
          <FaMapMarkerAlt
            size={30}
            style={{
              color: "#057cbc",
              cursor: "pointer",
              transform: "translate(34%, 0%)",
            }} // translate to match the circle from GISLayers.js
          />
        );

        // Add a click event listener that toggles the popup.
        el.addEventListener("click", (e) => {
          // Prevent the map's default click behavior.
          e.stopPropagation();

          if (popup.isOpen()) {
            popup.remove();
          } else {
            popup.addTo(mapRef.current);
          }
        });

        el.addEventListener("dblclick", (e) => {
          e.stopPropagation();
          e.preventDefault();
        });

        new mapboxgl.Marker({ element: el })
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(mapRef.current);
      });

      // Set viewer as active
      setViewerActive(true);
    });
  }, [map]);

  return (
    <div className={classes.overlay}>
      <ToggleHeaderButton />
      <div
        className={classes.buttonContainer}
        style={{
          top: isHeaderVisible ? "92px" : "36px",
          transition: "top 0.3s ease-in-out",
        }}
      >
        <IoIosCloseCircleOutline
          onClick={onClose}
          className={classes.closeButton}
        />
      </div>
      <div
        style={{ height: "100%" }}
        ref={mapContainerRef}
        className={classes.mapContainer}
        data-viewer-type="gis"
      />
    </div>
  );
}
