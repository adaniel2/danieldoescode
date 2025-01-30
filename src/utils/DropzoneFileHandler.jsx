import { PCDLoader } from "three/addons/loaders/PCDLoader.js";
import { XYZLoader } from "three/addons/loaders/XYZLoader.js"; // Import XYZLoader

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
      if (fileType == ".xyz") {
        // Direct text manipulation
        // const dataFrame = data.split("\n").map((line) => {
        //   const lineArray = line.trim().split(" ");
        //   return lineArray.map((num) => parseFloat(num));
        // }); // trim required because of potential \r

        console.log("XYZ file detected!");
        const loader = new XYZLoader();
        geometry = loader.parse(data); // Convert XYZ to BufferGeometry
      } else if (fileType == ".pcd") {
        // inspect header to determine ASCII vs. Binary
        // const headerDataRegex = new RegExp("(DATA)\\s(.*)");
        // const headerDataType = data.match(headerDataRegex)[2];
        // console.log(headerDataType);

        // switch (headerDataType) {
        //   case "ascii":
        //     break;
        //   case "binary_compressed":
        //     break;
        //   case "binary":
        //     break;
        //   default:
        //     // do nothing
        // }

        // Use PCDLoader to parse the file
        console.log("PCD file detected!");
        const loader = new PCDLoader();
        const points = loader.parse(data); // PCDLoader gives Points object
        geometry = points.geometry; // Extract geometry from Points object

        // console.log("PCD Geometry Loaded:", geometry);
      } else if (fileType == ".geojson") {
        try {
          const json = JSON.parse(data);
          console.log("GeoJSON Data:", json);
          processFileCallback(fileType, json);
        } catch (error) {
          console.error("Invalid GeoJSON file:", error);
        }
        return;
      }

      if (geometry) {
        processFileCallback(fileType, geometry);
      }

      // Show a summary of data w/ option to close menu
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
