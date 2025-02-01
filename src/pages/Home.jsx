// Home.jsx
import { useState } from "react";
import { IoEarthOutline } from "react-icons/io5";
import { LuRotate3D } from "react-icons/lu";
import "./pages.css";
import { Link } from "react-router-dom";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="logoContainer">
        <div className="logoContainerInner">
          <Link to="/gis">
            <IoEarthOutline className="logo gis" />
          </Link>
          <h1 className="logoText">GeoJSON</h1>
        </div>
        <div className="logoContainerInner">
          <Link to='/3d-pcv'>
          <LuRotate3D className="logo pcv" />
          </Link>
          <h1 className="logoText">Point Cloud</h1>
        </div>
      </div>
    </>
  );
}

export default Home;
