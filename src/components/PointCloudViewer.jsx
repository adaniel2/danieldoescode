// PointCloudViewer.jsx
import React, { useRef, useEffect, useState, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds, Center } from "@react-three/drei";
import * as THREE from "three";
import classes from "./PointCloudViewer.module.css";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ToggleHeaderButton from "./ToggleHeaderButton";
import SideBar from "./SideBar";

import {
  PointCloudMappingContext,
  PointCloudMappingProvider,
} from "../context/PointCloudMappingContext";

import { useUIContext } from "../context/UIContext";

// Points component that uses the cached mapping from context and applies the given point size.
function Points({ size }) {
  const geometryRef = useRef();
  const mapping = useContext(PointCloudMappingContext);

  useEffect(() => {
    if (!mapping) return;

    if (geometryRef.current) {
      // Set positions and colors from the cached mapping.
      geometryRef.current.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(mapping.positions, 3)
      );
      geometryRef.current.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(mapping.colors, 3)
      );

      // Compute the bounding information.
      geometryRef.current.computeBoundingBox();
      geometryRef.current.computeBoundingSphere();
    }
  }, [mapping]);

  return (
    <points>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial size={size} vertexColors />
    </points>
  );
}

export default function PointCloudViewer({ points, onClose, confirmation }) {
  if (!points || !confirmation) return null;

  const { isSideBarVisible, isHeaderVisible, setViewerActive } = useUIContext();

  const [isDarkMode, setDarkMode] = useState(false);
  const [pointSize, setPointSize] = useState(0.0004); // move this to the pointcloudmapingcontext

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  useEffect(() => {
    setViewerActive(true);

    return () => {
      // is onClose doing this, or is this unmount enough?
      setViewerActive(false);
    };
  }, [setViewerActive]);

  return (
    <PointCloudMappingProvider points={points} mappingAxis="y">
      <div className={classes.overlay} data-viewer-type="point-cloud">
        <ToggleHeaderButton />
        <div
          className={classes.buttonContainer}
          style={{
            top: isHeaderVisible ? "92px" : "36px",
            transition: "top 0.3s ease-in-out",
          }}
        >
          <IoIosCloseCircleOutline
            onClick={onClose}
            className={`${classes.closeButton} ${
              isDarkMode ? classes.darkCloseButton : ""
            }`}
          />
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={20}
            className={classes.darkModeToggle}
          />
        </div>

        {isSideBarVisible && <SideBar setPointSize={setPointSize} />}

        <div className={classes.canvasContainer}>
          <Canvas>
            <color
              attach="background"
              args={isDarkMode ? ["#333"] : ["#ffffff"]}
            />
            <ambientLight />
            <OrbitControls makeDefault />
            <Bounds fit clip>
              <Center>
                <Points size={pointSize} />
              </Center>
            </Bounds>
          </Canvas>
        </div>
      </div>
    </PointCloudMappingProvider>
  );
}
