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
  const [isViewerActive, setViewerActive] = useState(false);
  const [isConfirmed, setConfirmed] = useState(false);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      defaultColorScheme="auto"
      // theme={actionIcon}
    >
      {isHeaderVisible && <Header />}
      {isViewerActive && isConfirmed && (
        <ActionIcon
          size="sm"
          radius="xl"
          onClick={() => setHeaderVisible(!isHeaderVisible)}
          style={{
            position: "fixed",
            top: `calc(${isHeaderVisible ? "45px" : "5px"})`, // Adjust dynamically
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10000,
            backgroundColor: "rgba(74, 74, 74, 0.71)",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            transition: "top 0.3s ease-in-out", // Smooth movement
          }}
        >
          {isHeaderVisible ? (
            <PiArrowCircleUp
              size={24}
            />
          ) : (
            <PiArrowCircleDown size={24} />
          )}
        </ActionIcon>
      )}
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
            setConfirmed,
            isHeaderVisible,
          })}
        </main>

        <Footer />
      </div>
    </MantineProvider>
  );
}

export default App;
