import * as THREE from "three";

const geometries = [
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.SphereGeometry(0.5, 12, 8),
	new THREE.DodecahedronGeometry(0.5),
	new THREE.CylinderGeometry(0.5, 0.5, 1, 12),
];

export const randomGeometries = Array(8)
	.fill(0)
	.map(() => geometries[Math.floor(Math.random() * geometries.length)]);
