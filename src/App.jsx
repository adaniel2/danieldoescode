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
  // const [isConfirmed, setConfirmed] = useState(false);

  return (
    <ConsoleProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        defaultColorScheme="auto"
        // theme={actionIcon}
      >
        {<Header isHeaderVisible={isHeaderVisible}/>}
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
              // setConfirmed,
              setHeaderVisible,
              isHeaderVisible,
            })}
          </main>
          <Footer />
        </div>
        {isViewerActive && <LogConsole />}
      </MantineProvider>
    </ConsoleProvider>
  );
}

export default App;
