// PointCloudSummaryGenerator.jsx
import * as THREE from "three";

export default function generatePointCloudSummary(points, file) {
  points.geometry.computeBoundingBox();
  points.geometry.computeBoundingSphere();

  const fileName = file.name;
  const fileSize = file.size;
  const numPoints = points.geometry.attributes.position.count;

  const boundingBox = points.geometry.boundingBox;
  const boundingSphere = points.geometry.boundingSphere;

  const size = new THREE.Vector3();
  boundingBox.getSize(size);

  const bbx = size.x; // bb == bounding box
  const bby = size.y;
  const bbz = size.z;

  const center = boundingSphere.center;
  const sphereRadius = boundingSphere.radius;

  const sphereX = center.x;
  const sphereY = center.y;
  const sphereZ = center.z;

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
