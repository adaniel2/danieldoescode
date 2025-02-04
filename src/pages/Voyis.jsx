// Voyis.jsx
import { useState } from "react";
import { IoEarthOutline } from "react-icons/io5";
import { LuRotate3D } from "react-icons/lu";
import "./pages.css";
import { Link } from "react-router-dom";
import { useBasePath } from "../components/BasePathContext";

function Voyis() {
  const projectRoot = useBasePath(); // Get the correct base path
  
  return (
    <>
      <div className="logoContainer">
        <div className="logoContainerInner">
          <Link to={`${projectRoot}/gis`}>
            <IoEarthOutline className="logo gis" />
          </Link>
          <h1 className="logoText">GeoJSON</h1>
        </div>
        <div className="logoContainerInner">
          <Link to={`${projectRoot}/3d-pcv`}>
            <LuRotate3D className="logo pcv" />
          </Link>
          <h1 className="logoText">Point Cloud</h1>
        </div>
      </div>
    </>
  );
}

export default Voyis;
