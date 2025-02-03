// PointCloudViewer.jsx
import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Bounds, Center } from "@react-three/drei";
import * as THREE from "three";
import classes from "./PointCloudViewer.module.css";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ToggleHeaderButton from "./ToggleHeaderButton";
import SideBar from "./SideBar";
import { getZMappedColor } from "../utils/AltitudeColorMapper";

// Custom orbit controls to adjust camera position after fit
function CustomOrbitControls({ zoomFactor = 0.8 }) {
  const { camera } = useThree();

  useEffect(() => {
    // Adjust the camera's position relative to its current position.
    camera.position.set(
      camera.position.x * zoomFactor,
      camera.position.y * zoomFactor,
      camera.position.z * zoomFactor
    );
  }, [camera, zoomFactor]);

  return <OrbitControls makeDefault />;
}

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

    // Memoize the computation so that it only re-runs when `points` changes.
    const { positions, colors } = useMemo(() => {
      return getZMappedColor(points, "y");
    }, [points]);

    useEffect(() => {
      if (!points) return;

      if (geometryRef.current) {
        geometryRef.current.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3)
        );
        geometryRef.current.setAttribute(
          "color",
          new THREE.Float32BufferAttribute(colors, 3)
        );

        // Recompute bounding information so that helpers (e.g., Bounds, Center) work correctly
        geometryRef.current.computeBoundingBox();
        geometryRef.current.computeBoundingSphere();
      }
    }, [points, positions, colors]);

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
        <SideBar
          isHeaderVisible={isHeaderVisible}
          setPointSize={setPointSize}
        />
      )}

      <div className={classes.canvasContainer}>
        <Canvas>
          <color
            attach="background"
            args={isDarkMode ? ["#333"] : ["#ffffff"]}
          />
          <ambientLight />
          <CustomOrbitControls zoomFactor={0.8} />
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
