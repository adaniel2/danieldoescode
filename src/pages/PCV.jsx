// PCV.jsx
import ReactDOM from "react-dom";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber"; // React wrapper for Three.js
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

import { DropzoneFileHandler } from "../utils/DropzoneFileHandler";
import PointCloudViewerLegacy from "../components/legacy/PointCloudViewer";
import PointCloudViewer from "../components/PointCloudViewer";
import DZ from "../components/Dropzone";
import ConfirmationDialog from "../components/ConfirmationDialog";

import "./pages.css";

function PCV( { setViewerActive, setConfirmed, isHeaderVisible }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(null);
  const [summary, setSummary] = useState(null);
  const [confirmed, setConfirmation] = useState(false);

  // Suppress ESLint warning for files variable
  useEffect(() => {}, [files]); // empty useffect; runs when files changes, but does nothing

  // Notify App when viewer is active
  useEffect(() => {
    setViewerActive(!!points && confirmed); // Update isViewerActive only if confirmed is true
    return () => setViewerActive(false); // Cleanup on unmount
  }, [points, confirmed, setViewerActive]);

  const processFileCallback = (fileType, data) => {
    console.log(`Processed ${fileType} Data:`, data);

    const summary = data.dialogSummary;

    // Set the summary dialog information
    if (summary) {
      setSummary(summary);
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
    setConfirmation(true);
    setConfirmed(true); // Pass confirmation status to App.jsx
  };

  const handleClear = () => {
    setFiles([]); // Clear all files
    setPoints(null); // clear points
    setConfirmation(false);
    setConfirmed(false); // Reset confirmation in App.jsx
    setViewerActive(false); // Reset viewer active in App.jsx
    setSummary(null);
  };

  return (
    <>
      {!points && <DZ onDrop={handleDrop} loading={loading} />}
      {summary && <ConfirmationDialog summary={summary} sendConfirm={handleConfirm} />}
      {<PointCloudViewer points={points} onClose={handleClear} confirmation={confirmed} isHeaderVisible={isHeaderVisible} />}
    </>
  );
}

export default PCV;
