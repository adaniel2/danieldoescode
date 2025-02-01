// App.jsx
import React, { useState } from "react";
import { MantineProvider, AppShell, ActionIcon } from "@mantine/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "./index.css";
import { actionIconTheme } from "./constants/MantineOverride.js";
import { IoIosArrowDropdown } from "react-icons/io";

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
      <div
        style={{
          marginTop: isHeaderVisible ? 56 : 0,
          height: `calc(100vh - ${isHeaderVisible ? "56px" : "0px"})`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <main style={{ flex: 1 }}>{React.cloneElement(children, { setViewerActive, setConfirmed })}</main>

        <Footer />
      </div>

      {isViewerActive && isConfirmed && (
        <ActionIcon
          size="lg"
          radius="xl"
          onClick={() => setHeaderVisible(!isHeaderVisible)}
          style={{
            position: "fixed",
            top: isHeaderVisible ? "56px" : "10px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10000,
            backgroundColor: "#fff",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <IoIosArrowDropdown size={24} />
        </ActionIcon>
      )}
    </MantineProvider>
  );
}

export default App;
