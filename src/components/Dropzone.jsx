// Dropzone.jsx
import { Group, Text } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const dropZoneText = {
  "/gis": {
    title: "Drag and drop GIS Data here",
    subtitle: "Accepted format(s): GeoJSON",
    accept: {
      "application/geo+json": [".geojson"],
    },
  },
  "/3d-pcv": {
    title: "Drag and drop Point Cloud Data here",
    subtitle: "Accepted format(s): .xyz or .pcd",
    accept: {
      "chemical/x-xyz": [".xyz"],
      "application/x-pcd": [".pcd"],
    },
  },
};

export function DZ(props) {
  //   const page = props.page;
  //   const { title, subtitle } = dropZoneText[page];
  const location = useLocation();
  const currPage = dropZoneText[location.pathname];

  // Log changes to the loading state for debugging
  //   useEffect(() => {
  //     console.log("Loading state changed:", loading);
  //   }, [loading]);

//   const handleDrop = (acceptedFiles) => {
//     onDrop(acceptedFiles); // Call the parent handler
//   };

  const handleReject = (files) => {
    console.log("Rejected files:", files); d
  };

  return (
    <Dropzone
    //   onDrop={handleDrop}
      onReject={handleReject}
      maxSize={200 * 1024 ** 2} // 200 mb limit
      accept={currPage.accept}
    //   loading={loading} // Pass local loading state to Dropzone
      {...props}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size={52}
            color="var(--mantine-color-blue-6)"
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            size={52}
            color="var(--mantine-color-dimmed)"
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            {currPage.title}
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            {currPage.subtitle}
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}

export default DZ;
