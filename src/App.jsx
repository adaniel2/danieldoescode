// App.jsx
import React, { useState } from "react";
import { MantineProvider, AppShell, ActionIcon } from "@mantine/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "./index.css";
import { actionIconTheme } from "./constants/MantineOverride.js";
import { PiArrowCircleDown } from "react-icons/pi";
import { PiArrowCircleUp } from "react-icons/pi";

function App({ children }) {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  // const [isViewerActive, setViewerActive] = useState(false);
  // const [isConfirmed, setConfirmed] = useState(false);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      defaultColorScheme="auto"
      // theme={actionIcon}
    >
      {<Header isHeaderVisible={isHeaderVisible} />}
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
            // setViewerActive,
            // setConfirmed,
            setHeaderVisible,
            isHeaderVisible,
          })}
        </main>

        <Footer />
      </div>
    </MantineProvider>
  );
}

export default App;
