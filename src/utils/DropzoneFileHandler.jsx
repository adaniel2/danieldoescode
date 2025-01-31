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
      return;
    }

    reader.onload = (e) => {
      setLoading(false); // End loading once file is processed

      // Process file data
      const data = e.target.result;

      // geometry
      let geometry = null;

      // Handle file types
      if (fileType === ".xyz") {
        console.log("XYZ file detected!");
        const xyzLoader = new XYZLoader();
        // xyzLoader returns a BufferGeometry
        const geometry = xyzLoader.parse(data);
        // Wrap geometry in Three.Points for consistency
        const points = new THREE.Points(
          geometry,
          new THREE.PointsMaterial({
            size: 0.005,
            color: 0xffffff,
            sizeAttenuation: true,
            vertexColors: true
          })
        );
        processFileCallback(fileType, points);
      } else if (fileType === ".pcd") {
        console.log("PCD file detected!");

        const pcdLoader = new PCDLoader();

        // pcdLoader returns a full THREE.Points
        const points = pcdLoader.parse(data);
        processFileCallback(fileType, points);
      } else if (fileType == ".geojson") {
        try {
          const json = JSON.parse(data);
          console.log("GeoJSON Data:", json);
          processFileCallback(fileType, json);
        } catch (error) {
          console.error("Invalid GeoJSON file:", error);
        }
      }
    };

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded / e.total) * 100;
        console.log(`Progress: ${progress.toFixed(2)}%`);
      }
    };

    // Use `readAsArrayBuffer` for `.pcd` files, `readAsText` for others
    if (fileType === ".pcd") {
      reader.readAsArrayBuffer(file); // PCDLoader needs a binary buffer
    } else {
      reader.readAsText(file); // XYZ & GeoJSON are text-based
    }
  });
};
