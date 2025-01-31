// Viewer.jsx
import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds, Center } from "@react-three/drei";
import classes from "./PointCloudViewer.module.css";

export default function Viewer({ points, onClose }) {
  // If no geometry, don’t show anything (onClose runs handleClear in parent)
  if (!points) return null;

  points.geometry.computeBoundingBox();
  points.geometry.computeBoundingSphere();
  console.log(points.geometry.boundingBox, points.geometry.boundingSphere);

  function Points(props) {
    return <primitive object={points} {...props} />
  }

  return (
    <div
      className={classes.overlay}
    >
      <button className={classes.closeButton} onClick={onClose}>
        X
      </button>

      <Canvas style={{ width: "100%", height: "100%" }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight />
        <OrbitControls makeDefault />
        <Bounds fit clip observe>
          <Center>
            {/* <points>
              <bufferGeometry attach="geometry" {...geometry} />
              <pointsMaterial
                size={0.5}
                sizeAttenuation
                vertexColors
              />
            </points> */}
            {/* Primitive so we keep the original geometry + material */}
            {/* <primitive object={points} /> */}
            <Points rotation={[Math.PI, 0, 0]} material-size={0.001} material-color="white" />
          </Center>
        </Bounds>
      </Canvas>
    </div>
  );
}
