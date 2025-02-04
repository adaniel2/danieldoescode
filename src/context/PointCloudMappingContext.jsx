import React, { createContext, useMemo } from "react";
import { getZMappedColor } from "../utils/AltitudeColorMapper";

export const PointCloudMappingContext = createContext(null);

export function PointCloudMappingProvider({ points, mappingAxis = "y", children }) {
  // Compute the mapping only once for the given points.
  const mapping = useMemo(() => {
    return getZMappedColor(points, mappingAxis);
  }, [points, mappingAxis]);

  return (
    <PointCloudMappingContext.Provider value={mapping}>
      {children}
    </PointCloudMappingContext.Provider>
  );
}
