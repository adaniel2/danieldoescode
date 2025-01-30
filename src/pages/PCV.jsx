import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber"; // React wrapper for Three.js
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

import { DropzoneFileHandler } from "../utils/DropzoneFileHandler";
import DZ from "../components/Dropzone";

import "./pages.css";
import { Button } from "@mantine/core";

function PCV() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const processFileCallback = (fileType, dataFrame) => {
    console.log(`Processed ${fileType} Data:`, dataFrame);
    // Further processing logic (e.g., pass data to Three.js component)
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
  };

  return (
    <>
      <div>
        <Canvas>
          <mesh>
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>
        </Canvas>
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
