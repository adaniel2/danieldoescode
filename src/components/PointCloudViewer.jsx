// PointCloudViewer.jsx
import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds, Center } from "@react-three/drei";
import * as THREE from "three";
import classes from "./PointCloudViewer.module.css";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ToggleHeaderButton from "./ToggleHeaderButton";
import SideBar from "./SideBar";
import { getZMappedColor } from "../utils/AltitudeColorMapper";

export default function PointCloudViewer({
  points,
  onClose,
  confirmation,
  isHeaderVisible,
  setHeaderVisible,
  setViewerActive,
  isSideBarVisible,
}) {
  if (!points || !confirmation) return null;

  const [isDarkMode, setDarkMode] = useState(false);
  const [pointSize, setPointSize] = useState(0.0004);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  useEffect(() => {
    setViewerActive(true);
    return () => {
      setViewerActive(false);
    };
  }, [setViewerActive]);

  // Corrected Points Component with BufferGeometry
  function Points({ points }) {
    const geometryRef = useRef();

    useEffect(() => {
      if (!points) return;

      // Extract positions & colors from util function
      const { positions, colors } = getZMappedColor(points, "y"); // Map colors based on Y height

      if (geometryRef.current) {
        geometryRef.current.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3)
        );
        geometryRef.current.setAttribute(
          "color",
          new THREE.Float32BufferAttribute(colors, 3)
        );
      }
    }, [points]);

    return (
      <points>
        <bufferGeometry ref={geometryRef} />
        <pointsMaterial size={pointSize} vertexColors />
      </points>
    );
  }

  return (
    <div className={classes.overlay} data-viewer-type="point-cloud">
      <ToggleHeaderButton
        isHeaderVisible={isHeaderVisible}
        setHeaderVisible={setHeaderVisible}
      />
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

      {isSideBarVisible && (
        <SideBar isHeaderVisible={isHeaderVisible} setPointSize={setPointSize} />
      )}

      <div className={classes.canvasContainer}>
        <Canvas>
          <color attach="background" args={isDarkMode ? ["#333"] : ["#ffffff"]} />
          <ambientLight />
          <OrbitControls makeDefault />
          <Bounds fit clip observe>
            <Center>
              <Points points={points} />
            </Center>
          </Bounds>
        </Canvas>
      </div>
    </div>
  );
}
