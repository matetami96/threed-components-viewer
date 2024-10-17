import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";

import Model from "./components/Model";
import { threeDModels } from "./data/3d-models";

function App() {
	const [currentModelIndex, setCurrentModelIndex] = useState(0);
	const [url, setUrl] = useState(threeDModels[currentModelIndex].url);

	const prevHandler = () => {
		if (currentModelIndex > 0) {
			setCurrentModelIndex((prev) => prev - 1);
			setUrl(threeDModels[currentModelIndex - 1].url);
		} else {
			return;
		}
	};

	const nextHandler = () => {
		if (currentModelIndex < threeDModels.length - 1) {
			setCurrentModelIndex((prev) => prev + 1);
			setUrl(threeDModels[currentModelIndex + 1].url);
		} else {
			return;
		}
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					height: "100vh",
				}}
			>
				<button onClick={prevHandler}>prev</button>
				<Canvas camera={{ position: [0, 0, 250] }} style={{ background: "#ffffff" }}>
					<ambientLight intensity={0.5} />
					<pointLight position={[10, 10, 10]} intensity={1} />
					<directionalLight position={[-2, 5, 2]} intensity={1} />
					<Suspense fallback={null}>
						<Model position={[0, 0, 0]} url={url} />
					</Suspense>
					<OrbitControls />
				</Canvas>
				<button onClick={nextHandler}>next</button>
			</div>
		</>
	);
}

export default App;

/* import RandomMeshGroup from "./components/RandomMeshGroup";
import Scene from "./components/Scene";
import { useState } from "react";

import "./App.css";
import { threeDModels } from "./data/3d-models";

function App() {
	const [showRandomMeshes, setShowRandomMeshes] = useState(false);

	const renderModels = () => {
		return threeDModels.map((model, index) => (
			<Scene key={index} cameraPosition={model.cameraPosition} position={model.position} url={model.url} />
		));
	};

	return (
		<>
			<div className="button-container">
				<button className="button" onClick={() => setShowRandomMeshes((prevState) => !prevState)}>
					Toggle Random Meshes
				</button>
			</div>
			<div className="models-container">
				{renderModels()}
				{showRandomMeshes && <RandomMeshGroup />}
			</div>
		</>
	);
}

export default App;
 */
