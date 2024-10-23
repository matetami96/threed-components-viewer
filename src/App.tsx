import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";

import "./App.css";
import Model from "./components/Model";
import { fullModel, securopeLifelineModels } from "./data/securope-lifeline-models";

const App = () => {
	const [showSingleModel, setShowSingleModel] = useState(true);
	const renderModels = () => {
		return securopeLifelineModels.map((model, index) => (
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
			<div className="button-container">
				<button className="toggle-button" onClick={() => setShowSingleModel((prevState) => !prevState)}>
					{showSingleModel ? "Hide Full Model" : "Show Full Model"}
				</button>
				<p>{showSingleModel ? "Single imported model" : "Made from multiple 3D models"}</p>
			</div>
			{
				<Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 100] }}>
					<ambientLight intensity={0.5} />
					<pointLight position={[10, 10, 10]} intensity={1} />
					<directionalLight position={[-2, 5, 2]} intensity={1} />
					<Suspense fallback={null}>
						{showSingleModel ? <Model url={fullModel.url} position={fullModel.position} /> : renderModels()}
						<OrbitControls />
					</Suspense>
				</Canvas>
			}
		</div>
	);
};

export default App;
