import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import bbox from "@turf/bbox";
import { GIS_LAYERS } from "../constants/GISLayers";
import "mapbox-gl/dist/mapbox-gl.css";
import classes from "./GISViewer.module.css";
import ToggleHeaderButton from "./ToggleHeaderButton";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { createRoot } from "react-dom/client";
import { FaMapMarkerAlt } from "react-icons/fa";
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

  useEffect(() => {
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
      setActiveViewer("gis");
    });
  }, [map]);

  useEffect(() => {
    // Ensure that the map has been initialized before trying to update filters
    if (!mapRef.current) return;

    console.log("Updating map filter with:", gisPointsFilter);

    // Example: Update a filter on a specific layer.
    // You may need to adjust this based on how your filtering should work.
    // Here we assume you have a layer with id "some-layer" that should be filtered.

    // Example using map.setFilter:
    // mapRef.current.setFilter("some-layer", [
    //   "all",
    //   ["in", "tags", gisPointsFilter], // Adjust based on your data structure
    // ]);

    // Or, if you need to update the source's data:
    // Get your original data, filter it, and then update the source.
    const filteredData = {
      ...map,
      features: map.features.filter((feature) => {
        // Example filter: check if the feature's tags include the filter text
        const tags = feature.properties.tags || [];
        return tags
          .join(" ")
          .toLowerCase()
          .includes(gisPointsFilter.toLowerCase());
      }),
    };a

    // Update the source with the filtered data
    const source = mapRef.current.getSource("geojson-layer");
    if (source) {
      source.setData(filteredData);
    }
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
