// GIS.jsx
import DZ from "../components/Dropzone";
import "./pages.css";
import React, { useState } from "react";
import GISViewer from "../components/GISViewer";
import { DropzoneFileHandler } from "../utils/DropzoneFileHandler";
import ConfirmationDialog from "../components/ConfirmationDialog";

import { useConsole } from "../context/ConsoleContext";
import { useUIContext } from "../context/UIContext";
import { SideBarContextProvider } from "../context/SideBarContext";

function GIS() {
  const { setViewerActive, setHeaderVisible, setActiveViewer } = useUIContext();

  const { logMessage } = useConsole();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState(null);
  const [summary, setSummary] = useState(null);
  const [confirmed, setConfirmation] = useState(false);

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
    logMessage(`File confirmed.`);
    logMessage(`GIS Visualizer has opened.`);

    setSummary(null); // clear the summary dialog
    setConfirmation(true);
  };

  const handleClear = () => {
    logMessage(`GIS Visualizer closed.`);

    setFiles([]); // Clear all files
    setMap(null); // clear the map
    setConfirmation(false);
    setHeaderVisible(true); // Restore the header on viewer close
    setSummary(null);
    setViewerActive(false);
    setActiveViewer(null);
  };

  return (
    <>
      {!map && <DZ onDrop={handleDrop} loading={loading} />}
      {summary && (
        <ConfirmationDialog
          summary={summary}
          onConfirm={handleConfirm}
          onCancel={handleClear}
        />
      )}
      <SideBarContextProvider>
        <GISViewer map={map} onClose={handleClear} confirmation={confirmed} />
      </SideBarContextProvider>
    </>
  );
}

export default GIS;
