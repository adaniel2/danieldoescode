// PointCloudViewer.jsx
import React, { useRef, useEffect, useState, useContext } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Bounds, Center } from "@react-three/drei";
import * as THREE from "three";
import classes from "./PointCloudViewer.module.css";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ToggleHeaderButton from "./ToggleHeaderButton";
import SideBar from "./SideBar";
import { PointCloudMappingContext, PointCloudMappingProvider } from "./PointCloudMappingContext";

// Custom orbit controls to adjust camera position after fit
function CustomOrbitControls({ zoomFactor = 0.8 }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(
      camera.position.x * zoomFactor,
      camera.position.y * zoomFactor,
      camera.position.z * zoomFactor
    );
  }, [camera, zoomFactor]);

  return <OrbitControls makeDefault />;
}

// Points component now uses the cached mapping from context.
// It now accepts a "size" prop to control the point size.
function Points({ size }) {
  const geometryRef = useRef();
  const mapping = useContext(PointCloudMappingContext);

  useEffect(() => {
    if (!mapping) return;
    if (geometryRef.current) {
      geometryRef.current.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(mapping.positions, 3)
      );
      geometryRef.current.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(mapping.colors, 3)
      );
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

  return (
    <PointCloudMappingProvider points={points} mappingAxis="y">
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
                <Points size={pointSize} />
              </Center>
            </Bounds>
          </Canvas>
        </div>
      </div>
    </PointCloudMappingProvider>
  );
}
