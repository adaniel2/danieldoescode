// Dropzone.jsx
import { useDropzone } from "react-dropzone";
import { Group, Text, Stack } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { useCallback } from "react";
import { CiFileOn } from "react-icons/ci";
import { TbFileUpload } from "react-icons/tb";

import { useBasePath } from "../context/BasePathContext";

export function DZ(props) {
  const projectRoot = useBasePath();

  const dropZoneText = {
    [`${projectRoot}/gis`]: {
      title: "Upload GIS Data",
      subtitle: "Accepted format(s): GeoJSON",
      accept: {
        "application/geo+json": [".geojson"],
        "application/json": [".json"],
      },
    },
    [`${projectRoot}/3d-pcv`]: {
      title: "Upload Point Cloud Data",
      subtitle: "Accepted format(s): .xyz or .pcd",
      accept: { "chemical/x-xyz": [".xyz"], "application/x-pcd": [".pcd"] },
    },
  };

  const location = useLocation();
  
  const currPage = dropZoneText[location.pathname] || {
    title: "Drag and drop files here",
    subtitle: "Accepted formats will depend on the page",
    accept: {},
  };

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      console.log("Rejected files:", rejectedFiles);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file, errors }) => {
          console.error(`File ${file.name} was rejected due to:`, errors);
        });
      }

      if (props.onDrop) {
        props.onDrop(acceptedFiles);
      }
    },
    [props.onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: currPage.accept,
    maxSize: 200 * 1024 ** 2, // 200 MB limit
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        zIndex: 0
      }}
    >
      <div
        {...getRootProps({
          className: `dropzone ${isDragActive ? "drag-active" : ""}`,
        })}
      >
        <input {...getInputProps()} />
        <Stack align="center" style={{ pointerEvents: "none", gap: '2px'}}>
          {isDragActive ? (
            <TbFileUpload size={52} />
          ) : (
            <CiFileOn
              size={52}
              color="var(--mantine-color-dimmed)"
              stroke={1.5}
            />
          )}
          <Text
            size="xl"
            align="center"
            style={{ maxWidth: "100%", wordWrap: "break-word" }}
          >
            {currPage.title}
          </Text>
          <Text
            size="sm"
            color="dimmed"
            align="center"
            style={{ maxWidth: "100%", wordWrap: "break-word" }}
          >
            {currPage.subtitle}
          </Text>
        </Stack>
      </div>
    </div>
  );
}

export default DZ;
