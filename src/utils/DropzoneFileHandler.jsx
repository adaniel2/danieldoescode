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
    const regex = "(.*)(.xyz|.pcd|.geojson)";
    const path = file.path;
    const fileType = path.match(regex)[2];

    reader.onload = (e) => {
      setLoading(false); // End loading once file is processed

      // Process file data
      const data = e.target.result;

      // Handle file types
      if (fileType == ".xyz") {
        // Direct text manipulation
        const dataFrame = data.split('\n').map(line => line.trim()); // trim required because of potential \r
        // console.log(dataFrame);
        console.log(file.name);
        console.log(file.size / 1024 ** 2);
        const numPoints = dataFrame.length;
        console.log(numPoints);
        // bounding box dimensions?
        processFileCallback(fileType, dataFrame);
      } else if (fileType == ".pcd") {
        console.log('pcd file!');
        // inspect header to determine ASCII vs. Binary
      } else if (fileType == ".geojson") {
        // Handle JSON
        const json = JSON.parse(e.target.result);
        console.log("GeoJSON Data:", json);
      }

      // Show a summary of data w/ option to close menu
      
    };

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded / e.total) * 100;
        console.log(`Progress: ${progress}%`);
      }
    };

    reader.readAsText(file);
  });
};
