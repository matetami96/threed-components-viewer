import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import RandomMesh from "./RandomMesh";

import { randomGeometries } from "../data/random-geometries";

const RandomMeshGroup = () => {
	return randomGeometries.map((geometry, idx) => (
		<Canvas
			key={idx}
			camera={{ position: [5, 5, 5] }}
			style={{ background: "#ffffff", width: "300px", height: "300px" }}
		>
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} intensity={1} />
			<directionalLight position={[-2, 5, 2]} intensity={1} />
			<RandomMesh geometry={geometry} position={[0, 0, 0]} />
			<OrbitControls />
		</Canvas>
	));
};

export default RandomMeshGroup;
