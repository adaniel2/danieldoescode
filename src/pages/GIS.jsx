// GIS.jsx
import DZ from "../components/Dropzone";
import "./pages.css";
import { useState } from 'react';
import GISViewer from '../components/GISViewer';
import { DropzoneFileHandler } from '../utils/DropzoneFileHandler';

function GIS() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState(null);

  const processFileCallback = (fileType, data) => {
    console.log(`Processed ${fileType} Data:`, data);

    if (data) {
      setMap(data);
    }
  };

  const handleDrop = (acceptedFiles) => {
    DropzoneFileHandler(
      acceptedFiles,
      setFiles,
      setLoading,
      processFileCallback
    );
  };

  const handleClear = () => {
    setFiles([]); // Clear all files
    
  };

  return (
    <>
      {!map && !loading && <DZ onDrop={handleDrop} loading={loading} />}
      {/* {files.length !== 0 && !loading && (
        <Button onClick={handleClear}>Clear Files</Button>
      )} */}
      <GISViewer map={map} onClose={handleClear}/>
    </>
  );
}

export default GIS;
