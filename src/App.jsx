// App.jsx
import React, { useState } from "react";
import { MantineProvider, ActionIcon } from "@mantine/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "./index.css";

import LogConsole from "./components/LogConsole";
import { ConsoleProvider } from "./components/ConsoleContext";

function App({ children }) {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [isViewerActive, setViewerActive] = useState(false);
  const [isConsoleVisible, setConsoleVisible] = useState(false);
  const [isSideBarVisible, setSideBarVisible] = useState(true);

  return (
    <ConsoleProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        defaultColorScheme="auto"
        // theme={actionIcon}
      >
        {<Header isHeaderVisible={isHeaderVisible} setConsoleVisible={setConsoleVisible} setSideBarVisible={setSideBarVisible} isViewerActive={isViewerActive}/>}
        <div
          style={{
            marginTop: isHeaderVisible ? 56 : 0,
            height: `calc(100vh - ${isHeaderVisible ? "56px" : "0px"})`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <main style={{ flex: 1 }}>
            {React.cloneElement(children, {
              setViewerActive,
              setHeaderVisible,
              isHeaderVisible,
              isSideBarVisible
            })}
          </main>
          { !isViewerActive && <Footer />}
        </div>
        {(isViewerActive && isConsoleVisible) && <LogConsole />}
      </MantineProvider>
    </ConsoleProvider>
  );
}

export default App;
