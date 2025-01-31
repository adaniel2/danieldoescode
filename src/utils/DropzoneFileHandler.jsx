import { PCDLoader } from "three/addons/loaders/PCDLoader.js";
import { XYZLoader } from "three/addons/loaders/XYZLoader.js"; // Import XYZLoader
import * as THREE from "three";

export const DropzoneFileHandler = (
  acceptedFiles,
  setFiles,
  setLoading,
  processFileCallback
) => {
  console.log("Accepted files:", acceptedFiles);

  setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]); // however, assuming single file, so...
  setLoading(true); // Start loading animation

  // Simulate long file processing
  // setTimeout(() => {

  // }, 10000);

  // Creating previews/processing files
  acceptedFiles.forEach((file) => {
    const reader = new FileReader();
    const regex = /(.*)(\.xyz|\.pcd|\.geojson)$/;
    const match = file.path.match(regex);
    const fileType = match ? match[2] : null;

    if (!fileType) {
      console.error("Unsupported file type:", file.path);
      alert(`Error: Unsupported file type: ${file.path}`);
      return;
    }

    reader.onload = (e) => {
      setLoading(false); // End loading once file is processed
      const data = e.target.result;
      let points = null;

      try {
        if (fileType === ".xyz") {
          console.log("XYZ file detected!");
          const xyzLoader = new XYZLoader();
          const geometry = xyzLoader.parse(data);

          // Wrap geometry in THREE.Points for consistency
          points = new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
              size: 0.005,
              color: 0xffffff,
              sizeAttenuation: true,
              vertexColors: true,
            })
          );

          
          processFileCallback(fileType, points);
        } else if (fileType === ".pcd") {
          console.log("PCD file detected!");
          const pcdLoader = new PCDLoader();

          points = pcdLoader.parse(data); // PCDLoader returns a THREE.Points
          processFileCallback(fileType, points);
        } else if (fileType === ".geojson") {
          console.log("GeoJSON file detected!");
          const json = JSON.parse(data);
          processFileCallback(fileType, json);
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
        reader.readAsText(file); // XYZ & GeoJSON are text-based
      }
    } catch (error) {
      console.error("Error reading file:", error);
      alert(`Error reading file: ${error.message}`);
    }
  });
};
