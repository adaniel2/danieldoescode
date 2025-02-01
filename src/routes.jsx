// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import PCV from "./pages/PCV";
// import GIS from "./pages/GIS";

// import App from "./App";

// function AppRoutes() {
//   return (
//       <BrowserRouter>
//         <App>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="3d-pcv" element={<PCV />} />
//             <Route path="gis" element={<GIS />} />
//           </Routes>
//         </App>
//       </BrowserRouter>
//   );
// }

// export default AppRoutes;

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
