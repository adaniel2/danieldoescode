import ReactDOM from "react-dom";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber"; // React wrapper for Three.js
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

import { DropzoneFileHandler } from "../utils/DropzoneFileHandler";
import PointCloudViewerLegacy from "../components/legacy/PointCloudViewer";
import PointCloudViewer from "../components/PointCloudViewer" //
import DZ from "../components/Dropzone";

import "./pages.css";
import { Button } from "@mantine/core";

function PCV() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [geometry, setGeometry] = useState(null);
  const [points, setPoints] = useState(null);

  const processFileCallback = (fileType, data) => {
    console.log(`Processed ${fileType} Data:`, data);

    // if (geometry) {
    //   setGeometry(geometry);
    // }

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

  // return (
  //   <>
  //     {/* Only show the dropzone if we have no geometry */}
  //     {!geometry && !loading && (
  //       <DZ page="PCV" onDrop={handleDrop} loading={loading} />
  //     )}

  //     {/* If the user has loaded a file, show a clear button somewhere */}
  //     {files.length !== 0 && !loading && (
  //       <Button onClick={handleClear}>Clear Files</Button>
  //     )}

  //     {/* Fullscreen 3D viewer overlays everything if we have geometry */}
  //     <PointCloudViewer
  //       geometry={geometry}
  //       onClose={handleClear} // or a separate "close viewer" method
  //     />
  //   </>
  // );

  return (
    <>
      {!points && !loading && <DZ onDrop={handleDrop} loading={loading} />}
      {files.length !== 0 && !loading && (
        <Button onClick={handleClear}>Clear Files</Button>
      )}
      <PointCloudViewer points={points} onClose={handleClear} />
    </>
  );
}

export default PCV;