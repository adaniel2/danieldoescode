// PointCloudViewer.jsx
import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds, Center } from "@react-three/drei";
import classes from "./PointCloudViewer.module.css";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function PointCloudViewer({ points, onClose, confirmation }) {
  // If no geometry, don’t show anything (onClose runs handleClear in parent)
  if (!points) return null;
  if (!confirmation) return null;

  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  function Points(props) {
    return <primitive object={points} {...props} />;
  }

  return (
    <div className={classes.overlay}>
      <div className={classes.buttonContainer}>
        <IoIosCloseCircleOutline
          onClick={onClose}
          className={`${classes.closeButton} ${isDarkMode ? classes.darkCloseButton : ""}`}
        />
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={20}
          className={classes.darkModeToggle}
        />
      </div>
  
      <div className={classes.canvasContainer}>
        <Canvas>
          <color
            attach="background"
            args={isDarkMode ? ["#333"] : ["#ffffff"]}
          />
          <ambientLight />
          <OrbitControls makeDefault />
          <Bounds fit clip observe>
            <Center>
              <Points
                rotation={[0, 0, 0]}
                material-size={0.0005}
                material-color="white"
              />
            </Center>
          </Bounds>
        </Canvas>
      </div>
    </div>
  );

}
