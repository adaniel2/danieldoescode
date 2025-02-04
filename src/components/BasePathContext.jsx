import { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

// Create a Context
const BasePathContext = createContext("/");

// Custom Hook to use Base Path
export function useBasePath() {
  return useContext(BasePathContext);
}

// Provider Component
export function BasePathProvider({ children }) {
  const location = useLocation();

  // Determine the correct base path
  const isProject = location.pathname.startsWith("/projects/");
  const projectRoot = isProject ? location.pathname.split("/").slice(0, 3).join("/") : "/";

  return (
    <BasePathContext.Provider value={projectRoot}>
      {children}
    </BasePathContext.Provider>
  );
}
