import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import bbox from "@turf/bbox";
import { GIS_LAYERS } from "../constants/GISLayers";
import "mapbox-gl/dist/mapbox-gl.css";
import classes from "./GISViewer.module.css";
import ToggleHeaderButton from "./ToggleHeaderButton";
import { IoIosCloseCircleOutline } from "react-icons/io";
import SideBar from "./SideBar";

import { useUIContext } from "../context/UIContext";
import { useSideBarContext } from "../context/SideBarContext";

export default function GISViewer({ map, onClose, confirmation }) {
  if (!map || !confirmation) return null;

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  const {
    setViewerActive,
    isHeaderVisible,
    isSideBarVisible,
    setActiveViewer,
  } = useUIContext();

  const { gisPointsFilter } = useSideBarContext();

  const mapContainerRef = useRef();
  const mapRef = useRef();
  const markersRef = useRef([]); // to store default point markers

  // Helper function to add default markers for point features from a GeoJSON object
  const addPointMarkers = (geojson) => {
    const pointFeatures = geojson.features.filter(
      (feature) => feature.geometry.type === "Point"
    );
    for (const feature of pointFeatures) {
      const coordinates = feature.geometry.coordinates;
      const description = feature.properties.description || "No description";
      const tags = feature.properties.tags
        ? feature.properties.tags.join(", ")
        : "No tags";

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<p><strong>Coordinates:</strong> ${coordinates.join(", ")}</p>
         <p><strong>Description:</strong> ${description}</p>
         <p><strong>Tags:</strong> ${tags}</p>`
      );

      const marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(mapRef.current);
      markersRef.current.push(marker);
    }
  };

  // Helper function to remove all point markers from the map
  const removePointMarkers = () => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
  };

  useEffect(() => {
    if (mapRef.current) return; // Prevent duplicate initialization

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11", // 2D view
      zoom: 5,
      interactive: true,
    });

    mapRef.current.on("load", () => {
      // Add GeoJSON source
      if (!mapRef.current.getSource("geojson-layer")) {
        mapRef.current.addSource("geojson-layer", {
          type: "geojson",
          data: map,
        });
      }

      // Fit bounds to the data using Turf.js
      const bounds = bbox(map);
      mapRef.current.fitBounds(bounds, { padding: 50, maxZoom: 10 });

      // Add layers for non-point features (lines and polygons) only
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

      // Only add layers for features other than points
      GIS_LAYERS.filter((layer) => layer.id !== "geojson-points").forEach(
        ({ id, type, paint, filter }) => addLayer(id, type, paint, filter)
      );

      // Add default markers for point features using the initial data
      addPointMarkers(map);

      // Set viewer as active
      setViewerActive(true);
      setActiveViewer("gis");
    });
  }, [map, setActiveViewer, setViewerActive]);

  // Update the data source and markers when the filter changes
  useEffect(() => {
    if (!mapRef.current) return;

    console.log("Updating map filter with:", gisPointsFilter);

    const filteredData = {
      ...map,
      features: map.features.filter((feature) => {
        const tags = feature.properties.tags || [];
        const type = feature.geometry.type || "";
        const coords = feature.geometry.coordinates || [];
        
        return tags
          .join(" ")
          .toLowerCase()
          .includes(gisPointsFilter.toLowerCase());
      }),
    };

    console.log(filteredData);

    // Update the source (for non-point layers)
    const source = mapRef.current.getSource("geojson-layer");
    if (source) {
      source.setData(filteredData);
    }

    // Update the default markers for points:
    // 1. Remove existing markers.
    removePointMarkers();
    // 2. Add new markers for the filtered point features.
    addPointMarkers(filteredData);
  }, [gisPointsFilter, map]);

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

      {isSideBarVisible && <SideBar />}

      <div
        style={{ height: "100%" }}
        ref={mapContainerRef}
        className={classes.mapContainer}
        data-viewer-type="gis"
      />
    </div>
  );
}
