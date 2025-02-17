// PCV.jsx
import React, { useState } from "react";
import { DropzoneFileHandler } from "../utils/DropzoneFileHandler";
import PointCloudViewer from "../components/PointCloudViewer";
import DZ from "../components/Dropzone";
import ConfirmationDialog from "../components/ConfirmationDialog";

import "./pages.css";

import { useConsole } from "../context/ConsoleContext";
import { useUIContext } from "../context/UIContext";
import { SideBarContextProvider } from "../context/SideBarContext";

function PCV() {
  const { setViewerActive, setHeaderVisible, setActiveViewer } = useUIContext();

  const { logMessage } = useConsole();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(null);
  const [summary, setSummary] = useState(null);
  const [confirmed, setConfirmation] = useState(false);

  const processFileCallback = (fileType, data) => {
    console.log(`Processed ${fileType} Data:`, data);
    logMessage(`Uploaded file: ${data.dialogSummary.fileName} (${fileType})`);

    const dialogSummary = data.dialogSummary;

    // Set the summary dialog information
    if (dialogSummary) {
      setSummary(dialogSummary);
    }

    // Now data is a THREE.Points for XYZ or PCD
    if (data && data.isPoints) {
      setPoints(data);
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
    logMessage(`Point Cloud Visualizer has opened.`);

    setSummary(null); // clear the summary dialog
    setConfirmation(true);
  };

  const handleClear = () => {
    logMessage(`Point Cloud Visualizer closed.`);

    setFiles([]); // Clear all files
    setPoints(null); // clear points
    setConfirmation(false);
    setHeaderVisible(true); // Restore the header on viewer close
    setSummary(null);
    setViewerActive(false);
    setActiveViewer(null);
  };

  return (
    <>
      {!confirmed && <DZ onDrop={handleDrop} loading={loading} />}
      {summary && (
        <ConfirmationDialog
          summary={summary}
          onConfirm={handleConfirm}
          onCancel={handleClear}
        />
      )}
      <SideBarContextProvider>
        {
          <PointCloudViewer
            points={points}
            onClose={handleClear}
            confirmation={confirmed}
          />
        }
      </SideBarContextProvider>
    </>
  );
}

export default PCV;
