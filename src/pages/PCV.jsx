// PCV.jsx
import React, { useState } from "react";
import { DropzoneFileHandler } from "../utils/DropzoneFileHandler";
import PointCloudViewer from "../components/PointCloudViewer";
import DZ from "../components/Dropzone";
import ConfirmationDialog from "../components/ConfirmationDialog";

import "./pages.css";

function PCV({ setHeaderVisible, isHeaderVisible }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(null);
  const [summary, setSummary] = useState(null);
  const [confirmed, setConfirmation] = useState(false);

  const processFileCallback = (fileType, data) => {
    console.log(`Processed ${fileType} Data:`, data);

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
    setSummary(null); // clear the summary dialog
    setConfirmation(true);

    // setConfirmed(true); // Pass confirmation status to App.jsx
  };

  const handleClear = () => {
    setFiles([]); // Clear all files
    setPoints(null); // clear points
    setConfirmation(false);
    setHeaderVisible(true); // Restore the header on viewer close
    setSummary(null);
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
      {
        <PointCloudViewer
          points={points}
          onClose={handleClear}
          confirmation={confirmed}
          isHeaderVisible={isHeaderVisible}
          setHeaderVisible={setHeaderVisible}
        />
      }
    </>
  );
}

export default PCV;
