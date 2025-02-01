// DropzoneFileHandler.jsx
import { PCDLoader } from "three/addons/loaders/PCDLoader.js";
import { XYZLoader } from "three/addons/loaders/XYZLoader.js"; // Import XYZLoader
import * as THREE from "three";

import generatePointCloudSummary from '../utils/PointCloudSummaryGenerator';

export const DropzoneFileHandler = (
  acceptedFiles,
  setFiles,
  setLoading,
  processFileCallback
) => {
  console.log("Accepted files:", acceptedFiles);

  setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  setLoading(true); // Start loading animation

  acceptedFiles.forEach((file) => {
    const reader = new FileReader();
    const regex = /(.*)(\.xyz|\.pcd|\.geojson|\.json)$/;
    const match = file.path.match(regex);
    const fileType = match ? match[2] : null;

    reader.onload = (e) => {
      setLoading(false); // End loading once file is processed
      const data = e.target.result;

      try {
        let points = null;

        switch (fileType) {
          case ".xyz":
            console.log("XYZ file detected!");

            const xyzLoader = new XYZLoader();
            const xyzGeometry = xyzLoader.parse(data);

            // Wrap the geometry in a THREE.Points for consistency
            points = new THREE.Points(
              xyzGeometry,
              new THREE.PointsMaterial({
                size: 0.005,
                color: 0xffffff,
                sizeAttenuation: true,
                vertexColors: true,
              })
            );

            // Create .xyz summary object
            const xyzSummary = generatePointCloudSummary(points, file);
            points.dialogSummary = xyzSummary;

            console.log(points);

            processFileCallback(fileType, points);
            break;

          case ".pcd":
            console.log("PCD file detected!");

            const pcdLoader = new PCDLoader();

            // PCDLoader returns a THREE.Points already
            points = pcdLoader.parse(data);

            // Create .pcd summary object
            const pcdSummary = generatePointCloudSummary(points, file);
            points.dialogSummary = pcdSummary;
  
            processFileCallback(fileType, points);
            break;

          case ".geojson":
          case ".json":
            console.log("GeoJSON file detected!");

            const json = JSON.parse(data);

            processFileCallback(fileType, json);
            break;

          default:
            // Covers null, undefined, or any other non-supported extension
            console.error("Unsupported file type:", file.path);
            alert(`Error: Unsupported file type: ${file.path}`);
            return;
        }
      } catch (error) {
        console.error(`Error processing ${fileType} file:`, error);
        alert(`Error processing file: ${error.message}`);
      }
    };

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded / e.total) * 100;
        console.log(`Progress: ${progress.toFixed(2)}%`);
      }
    };

    // Use `readAsArrayBuffer` for `.pcd` files, `readAsText` for others
    try {
      if (fileType === ".pcd") {
        reader.readAsArrayBuffer(file); // PCDLoader needs a binary buffer
      } else {
        reader.readAsText(file); // XYZ & GeoJSON & JSON are text-based
      }
    } catch (error) {
      console.error("Error reading file:", error);
      alert(`Error reading file: ${error.message}`);
    }
  });
};
