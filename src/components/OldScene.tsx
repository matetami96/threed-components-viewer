import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

import Model from "./Model";

const Scene = ({
	cameraPosition,
	position,
	url,
}: {
	cameraPosition: [number, number, number];
	position: [number, number, number];
	url: string;
}) => (
	<Canvas camera={{ position: cameraPosition }} style={{ background: "#ffffff", width: "300px", height: "300px" }}>
		<ambientLight intensity={0.5} />
		<pointLight position={[10, 10, 10]} intensity={1} />
		<directionalLight position={[-2, 5, 2]} intensity={1} />
		<Suspense fallback={null}>
			<Model position={position} url={url} />
		</Suspense>
		<OrbitControls />
	</Canvas>
);

export default Scene;
