import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

import "./App.css";
import Model from "./components/Model";
import { enterFullscreen } from "./utils/utils";
import Spinner from "./components/Spinner";

type Loaded3DModels = {
	name: string;
	url: string;
	position: [number, number, number];
	scale?: [number, number, number];
	rotation?: [number, number, number];
	color?: string;
}[];

const App = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [loadedModels] = useState<Loaded3DModels | []>([
		{
			name: threed_files[0]["code"],
			url: `${apiBaseUrl}/userfiles/components/3d/${threed_files[0]["id"]}/${threed_files[0]["3d_file"]!}`,
			position: [0, 0, 0],
			scale: [1, 1, 1],
			rotation: [0, 0, 0],
			color: "grey",
		},
	]);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setIsMobile(window.innerWidth <= 768);
		});

		return () => {
			window.removeEventListener("resize", () => {
				setIsMobile(window.innerWidth <= 768);
			});
		};
	}, []);

	const renderModels = () => {
		return loadedModels.map((model, index) => (
			<Model
				key={index}
				url={model.url}
				position={model.position}
				scale={model.scale}
				rotation={model.rotation}
				color={model.color}
			/>
		));
	};

	return (
		<div className="app-container">
			{isMobile && (
				<div className="button-container">
					<button
						className="toggle-button"
						onClick={() => {
							enterFullscreen();
						}}
					>
						{"Toggle Fullscreen"}
					</button>
				</div>
			)}
			{loadedModels.length > 0 ? (
				<Canvas camera={{ position: [0, 0, 250] }} onTouchMove={(e) => e.stopPropagation()}>
					<ambientLight intensity={0.5} />
					<pointLight position={[10, 10, 10]} intensity={1} />
					<directionalLight position={[-2, 5, 2]} intensity={1} />
					<Suspense fallback={<Spinner />}>
						{renderModels()}
						<OrbitControls />
					</Suspense>
				</Canvas>
			) : (
				<div>No models loaded</div>
			)}
		</div>
	);
};

export default App;
