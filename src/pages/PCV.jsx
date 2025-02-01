// PCV.jsx
import ReactDOM from "react-dom";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber"; // React wrapper for Three.js
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

import { DropzoneFileHandler } from "../utils/DropzoneFileHandler";
import PointCloudViewerLegacy from "../components/legacy/PointCloudViewer";
import PointCloudViewer from "../components/PointCloudViewer"
import DZ from "../components/Dropzone";

import "./pages.css";

function PCV() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [geometry, setGeometry] = useState(null);
  const [points, setPoints] = useState(null);

  const processFileCallback = (fileType, data) => {
    console.log(`Processed ${fileType} Data:`, data);

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

  const handleClear = () => {
    setFiles([]); // Clear all files
    setGeometry(null); // clear geometry
    setPoints(null); // clear points
  };

  return (
    <>
      {!points && !loading && <DZ onDrop={handleDrop} loading={loading} />}
      {/* {files.length !== 0 && !loading && (
        <Button onClick={handleClear}>Clear Files</Button>
      )} */}
      <PointCloudViewer points={points} onClose={handleClear} />
    </>
  );
}

export default PCV;