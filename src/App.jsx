// App.jsx
import React from "react";
import { MantineProvider, AppShell } from "@mantine/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import "./index.css";

function App({ children }) {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        defaultColorScheme="auto"
      >
        <Header />
        <div>{children}</div>
        <Footer />
      </MantineProvider>
    </>
  );
}

export default App;
