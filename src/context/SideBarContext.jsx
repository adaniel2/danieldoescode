import { createContext, useContext, useState } from "react";

const SideBarContext = createContext({
  gisPointsFilter: "",
  setGISPointsFilter: () => {},
});

export function useSideBarContext() {
  return useContext(SideBarContext);
}

export function SideBarContextProvider({ children }) {
  const [gisPointsFilter, setGISPointsFilter] = useState("");

  return (
    <SideBarContext.Provider value={{ gisPointsFilter, setGISPointsFilter }}>
      {children}
    </SideBarContext.Provider>
  );
}
