// GIS.jsx
import DZ from "../components/Dropzone";
import "./pages.css";
import React, { useState } from "react";
import GISViewer from "../components/GISViewer";
import { DropzoneFileHandler } from "../utils/DropzoneFileHandler";

import { useConsole } from "../context/ConsoleContext";
import { useUIContext } from "../context/UIContext";

function GIS() {
  const {
    setViewerActive,
    setHeaderVisible,
  } = useUIContext();

  const { logMessage } = useConsole();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState(null);

  const processFileCallback = (fileType, data) => {
    console.log(`Processed ${fileType} Data:`, data);
    logMessage(`Uploaded file type: (${fileType})`);

    // Set the map
    if (data) {
      setMap(data);
    }
  };

  const handleDrop = (acceptedFiles) => {
    DropzoneFileHandler(
      acceptedFiles,
      setFiles,
      setLoading,
      processFileCallback
    );
  };

  const handleClear = () => {
    logMessage(`GIS Visualizer closed.`);

    setFiles([]); // Clear all files
    setMap(null); // clear the map
    setHeaderVisible(true); // Restore the header on viewer close
    setViewerActive(false);
  };

  return (
    <>
      {!map && <DZ onDrop={handleDrop} loading={loading} />}

      <GISViewer map={map} onClose={handleClear} />
    </>
  );
}

export default GIS;
