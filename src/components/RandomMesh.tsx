import * as THREE from "three";

const RandomMesh = ({ geometry, position }: { geometry: THREE.BufferGeometry; position: [number, number, number] }) => {
	const material = new THREE.MeshStandardMaterial({
		color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
		roughness: 0.5,
	});

	return (
		<mesh geometry={geometry} material={material} position={position}>
			<meshStandardMaterial attach="material" color={material.color} />
		</mesh>
	);
};

export default RandomMesh;
