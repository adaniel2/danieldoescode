// routes.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BasePathProvider } from "./context/BasePathContext";
import Voyis from "./pages/Voyis";
import PCV from "./pages/PCV";
import GIS from "./pages/GIS";
import App from "./App";

function AppRoutes() {
  return (
    <BrowserRouter>
    <BasePathProvider>
      <Routes>
        <Route path="/projects/voyis" element={<App><Voyis /></App>} />
        <Route path="/projects/voyis/3d-pcv" element={<App><PCV /></App>} />
        <Route path="/projects/voyis/gis" element={<App><GIS /></App>} />
      </Routes>
      </BasePathProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
