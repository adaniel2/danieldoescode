// GIS.jsx
import DZ from "../components/Dropzone";
import "./pages.css";
import React, { useState } from "react";
import GISViewer from "../components/GISViewer";
import { DropzoneFileHandler } from "../utils/DropzoneFileHandler";

import { useConsole } from "../components/ConsoleContext";

function GIS({
  setViewerActive,
  setHeaderVisible,
  isHeaderVisible,
  isSideBarVisible,
}) {
  const { logMessage } = useConsole();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState(null);

  const processFileCallback = (fileType, data) => {
    console.log(`Processed ${fileType} Data:`, data);
    logMessage(`Uploaded file type: (${fileType})`);

    const dialogSummary = data.dialogSummary;

    // Set the summary dialog information
    if (dialogSummary) {
      setSummary(dialogSummary);
    }

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

  const handleConfirm = () => {
    logMessage(`Files confirmed.`);
    logMessage(`GIS Visualizer has opened.`);
    setSummary(null); // clear the summary dialog
  };

  const handleClear = () => {
    logMessage(`GIS Visualizer closed.`);
    setFiles([]); // Clear all files
    setMap(null); // clear the map
    setHeaderVisible(true); // Restore the header on viewer close
    setSummary(null);
    setViewerActive(false);
  };

  return (
    <>
      {!map && <DZ onDrop={handleDrop} loading={loading} />}
      
      <GISViewer
        map={map}
        onClose={handleClear}
        isHeaderVisible={isHeaderVisible}
        setHeaderVisible={setHeaderVisible}
        setViewerActive={setViewerActive}
        isSideBarVisible={isSideBarVisible}
      />
    </>
  );
}

export default GIS;
