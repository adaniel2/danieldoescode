// AltitudeColorMapper.jsx
export function getZMappedColor(points, mappingAxis = "z") {
  // Use the typed array directly from the geometry
  const pointsArray = points.geometry.attributes.position.array;
  const numPoints = pointsArray.length / 3;

  // Create a new Float32Array for colors (3 values per point)
  const colors = new Float32Array(numPoints * 3);

  // Determine which axis to use: 0 for x, 1 for y, 2 for z (default)
  const axisIndex = mappingAxis === "x" ? 0 : mappingAxis === "y" ? 1 : 2;

  // First pass: determine min and max values for the chosen axis
  let minVal = Infinity;
  let maxVal = -Infinity;
  
  for (let i = 0; i < pointsArray.length; i += 3) {
    const value = pointsArray[i + axisIndex] ?? 0;
    if (value < minVal) minVal = value;
    if (value > maxVal) maxVal = value;
  }

  // Second pass: normalize the selected axis and assign colors
  // Blue at low values, red at high values: red = normalized value, blue = 1 - normalized value.
  for (let i = 0, colorIndex = 0; i < pointsArray.length; i += 3, colorIndex += 3) {
    const value = pointsArray[i + axisIndex] ?? 0;
    const normalizedVal = maxVal === minVal ? 0.5 : (value - minVal) / (maxVal - minVal);
    
    colors[colorIndex] = normalizedVal;       // Red component
    colors[colorIndex + 1] = 0;                 // Green component
    colors[colorIndex + 2] = 1 - normalizedVal; // Blue component
  }

  // Return the original positions array and the computed colors
  return { positions: pointsArray, colors };
}
