export function getZMappedColor(points, mappingAxis = "z") {
    // Grab points array
    const pointsArray = points.geometry.attributes.position.array;
  
    const positions = [];
    const colors = [];
    let minVal = Infinity;
    let maxVal = -Infinity;
  
    // Get the correct index based on mappingAxis
    const axisIndex = mappingAxis === "x" ? 0 : mappingAxis === "y" ? 1 : 2;
  
    // Loop through points and extract positions
    for (let i = 0; i < pointsArray.length; i += 3) {
      const x = pointsArray[i] ?? 0;
      const y = pointsArray[i + 1] ?? 0;
      const z = pointsArray[i + 2] ?? 0;
  
      // Track min/max for the chosen axis
      const altValue = [x, y, z][axisIndex];
      minVal = Math.min(minVal, altValue);
      maxVal = Math.max(maxVal, altValue);
  
      positions.push(x, y, z);
    }
  
    // Normalize values based on the selected axis and assign colors
    positions.forEach((_, i) => {
      if (i % 3 === axisIndex) { // Apply normalization only to the selected axis
        const val = positions[i];
        const normalizedVal = maxVal === minVal ? 0.5 : (val - minVal) / (maxVal - minVal);
        const color = [normalizedVal, 0, 1 - normalizedVal]; // Blue at low, red at high
        colors.push(...color);
      }
    });
  
    return { positions: new Float32Array(positions), colors: new Float32Array(colors) };
  }
  