// routes.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PCV from "./pages/PCV";
import GIS from "./pages/GIS";
import App from "./App";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App><Home /></App>} />
        <Route path="3d-pcv" element={<App><PCV /></App>} />
        <Route path="gis" element={<App><GIS /></App>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
