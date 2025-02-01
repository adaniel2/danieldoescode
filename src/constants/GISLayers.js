export const GIS_LAYERS = [
    {
      id: "geojson-points",
      type: "circle",
      paint: { "circle-radius": 6, "circle-color": "#007cbf" },
      filter: ["==", "$type", "Point"],
    },
    {
      id: "geojson-lines",
      type: "line",
      paint: { "line-color": "#000000", "line-width": 2 },
      filter: ["==", "$type", "LineString"],
    },
    {
      id: "geojson-polygons",
      type: "fill",
      paint: { "fill-color": "rgba(0, 0, 0, 0.4)", "fill-outline-color": "#000000" },
      filter: ["==", "$type", "Polygon"],
    },
  ];
  