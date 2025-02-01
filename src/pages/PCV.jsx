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

function PCV() {
  const [files, setFiles] = useState([]);
  // Suppress ESLint warning for files variable
  useEffect(() => {}, [files]); // empty useffect; runs when files changes, but does nothing

  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(null);
  const [summary, setSummary] = useState(null);
  const [confirmed, setConfirmation] = useState(false);

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
  };

  const handleClear = () => {
    setFiles([]); // Clear all files
    setPoints(null); // clear points
    setConfirmation(false);
    setSummary(null);
  };

  return (
    <>
      {!points && <DZ onDrop={handleDrop} loading={loading} />}
      {summary && <ConfirmationDialog summary={summary} sendConfirm={handleConfirm} />}
      {<PointCloudViewer points={points} onClose={handleClear} confirmation={confirmed}/>}
    </>
  );
}

export default PCV;
