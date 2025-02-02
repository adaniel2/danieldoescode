// PointCloudSummaryGenerator.jsx
import * as THREE from "three";
import { filesize } from "filesize";

export default function generatePointCloudSummary(points, file) {
  points.geometry.computeBoundingBox();
  points.geometry.computeBoundingSphere();

  const fileName = file.name;
  const fileSize = filesize(file.size, {standard: "jedec"});
  const numPoints = new Intl.NumberFormat().format(
    points.geometry.attributes.position.count
  ); // format with commas

  const boundingBox = points.geometry.boundingBox;
  const boundingSphere = points.geometry.boundingSphere;

  const size = new THREE.Vector3();
  boundingBox.getSize(size);

  const bbx = size.x.toFixed(4); // bb == bounding box
  const bby = size.y.toFixed(4);
  const bbz = size.z.toFixed(4);

  const center = boundingSphere.center;
  const sphereRadius = boundingSphere.radius.toFixed(4);

  const sphereX = center.x.toFixed(4);
  const sphereY = center.y.toFixed(4);
  const sphereZ = center.z.toFixed(4);

  return {
    fileName,
    fileSize,
    numPoints,
    bbx,
    bby,
    bbz,
    sphereX,
    sphereY,
    sphereZ,
    sphereRadius,
  };
};
