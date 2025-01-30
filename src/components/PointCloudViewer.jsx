import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function PointCloudViewer({ pointsData }) {
  const pointsRef = useRef();

  // Generate geometry from points data
    const generateGeometry = (points) => {
      const positions = [];
      const colors = [];
      const color = new THREE.Color();

      points.forEach(([x, y, z]) => {
        positions.push(x, y, z);

        // Map altitude (z) to a color
        color.setHSL((z + 50) / 100, 1.0, 0.5); // Adjust the range for altitude
        colors.push(color.r, color.g, color.b);
      });

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
      return geometry;
    };

    const geometry = pointsData ? generateGeometry(pointsData) : null;

  return (
    <Canvas>
      <OrbitControls />
      <ambientLight />
      {geometry && (
        <points ref={pointsRef}>
          <bufferGeometry attach="geometry" {...geometry} />
          <pointsMaterial vertexColors size={0.5} sizeAttenuation />
        </points>
      )}
    </Canvas>
  );
}

export default PointCloudViewer;
