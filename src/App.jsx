// App.jsx
import React from "react";
import { MantineProvider, AppShell } from "@mantine/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "./index.css";
import { actionIcon } from "./constants/MantineOverride.js";

function App({ children }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      defaultColorScheme="auto"
      // theme={actionIcon}
    >
      <Header />
      <div
        style={{
          marginTop: 56,
          height: "calc(100vh - 56px)", // Changed from min-height
          display: "flex",
          flexDirection: "column",
        }}
      >
        <main style={{ flex: 1 }}>{children}</main>

        <Footer />
      </div>
    </MantineProvider>
  );
}

export default App;
