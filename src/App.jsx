// App.jsx
import React from "react";
import { MantineProvider } from "@mantine/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "./index.css";

import LogConsole from "./components/LogConsole";
import { ConsoleProvider } from "./context/ConsoleContext";
import { UIContextProvider, useUIContext } from "./context/UIContext";

function App({ children }) {
  return (
    <UIContextProvider>
      <ConsoleProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          defaultColorScheme="auto"
        >
          <AppContent>{children}</AppContent>
        </MantineProvider>
      </ConsoleProvider>
    </UIContextProvider>
  );
}

// This setup allows for useUIContext() to be inside the provider
function AppContent({ children }) {
  const { isViewerActive, isConsoleVisible, isHeaderVisible } = useUIContext();

  return (
    <>
      <Header />
      <div
        style={{
          marginTop: isHeaderVisible ? 56 : 0,
          height: `calc(100vh - ${isHeaderVisible ? "56px" : "0px"})`,
          display: "flex",
          flexDirection: "column",
        }}
        className="app-container"
      >
        <main style={{ flex: 1 }}>{React.cloneElement(children)}</main>
        {!isViewerActive && <Footer />}
      </div>
      {isViewerActive && isConsoleVisible && <LogConsole />}
    </>
  );
}

export default App;
