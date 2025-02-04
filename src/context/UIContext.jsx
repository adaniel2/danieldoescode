// UIContext.jsx
import { createContext, useContext, useState } from "react";

const UIContext = createContext({
  isHeaderVisible: true,
  setHeaderVisible: () => {},
  isViewerActive: false,
  setViewerActive: () => {},
  isConsoleVisible: false,
  setConsoleVisible: () => {},
  isSideBarVisible: true,
  setSideBarVisible: () => {},
});

export function useUIContext() {
  return useContext(UIContext);
}

export function UIContextProvider({ children }) {
  // States
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [isViewerActive, setViewerActive] = useState(false);
  const [isConsoleVisible, setConsoleVisible] = useState(false);
  const [isSideBarVisible, setSideBarVisible] = useState(true);

  // Provider for states and setters
  return (
    <UIContext.Provider
      value={{
        isHeaderVisible,
        setHeaderVisible,
        isViewerActive,
        setViewerActive,
        isConsoleVisible,
        setConsoleVisible,
        isSideBarVisible,
        setSideBarVisible,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
