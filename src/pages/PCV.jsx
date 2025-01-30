import ReactDOM from "react-dom";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber"; // React wrapper for Three.js
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

import { DropzoneFileHandler } from "../utils/DropzoneFileHandler";
import PointCloudViewer from "../components/PointCloudViewer";
import DZ from "../components/Dropzone";

import "./pages.css";
import { Button } from "@mantine/core";

function PCV() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [geometry, setGeometry] = useState(null);

  const processFileCallback = (fileType, geometry) => {
    console.log(`Processed ${fileType} Data:`, geometry);

    if (geometry) {
      setGeometry(geometry);
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
    setGeometry(null);
  };

  return (
    <>
      <div>
        <PointCloudViewer geometry={geometry} />
      </div>
      <div>
        {files.length != 0 && !loading && (
          <Button onClick={handleClear}>Clear Files</Button>
        )}
        {!(files.length != 0 && !loading) && (
          <DZ page={"PCV"} onDrop={handleDrop} loading={loading} />
        )}
      </div>
    </>
  );
}

export default PCV;