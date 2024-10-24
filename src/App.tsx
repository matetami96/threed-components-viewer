import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";

import "./App.css";
import Model from "./components/Model";
import { enterFullscreen } from "./utils/utils";
import { fullModel, securopeLifelineModels } from "./data/securope-lifeline-models";
import Spinner from "./components/Spinner";

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
				<button
					className="toggle-button"
					onClick={() => {
						setShowSingleModel((prevState) => !prevState);
						enterFullscreen();
					}}
				>
					{showSingleModel ? "Hide Full Model" : "Show Full Model"}
				</button>
				<p>{showSingleModel ? "Single imported model" : "Made from multiple 3D models"}</p>
			</div>
			<Canvas camera={{ position: [0, 0, 250] }} onTouchMove={(e) => e.stopPropagation()}>
				<ambientLight intensity={0.5} />
				<pointLight position={[10, 10, 10]} intensity={1} />
				<directionalLight position={[-2, 5, 2]} intensity={1} />
				<Suspense fallback={<Spinner />}>
					{showSingleModel ? <Model url={fullModel.url} position={fullModel.position} /> : renderModels()}
					<OrbitControls />
				</Suspense>
			</Canvas>
		</div>
	);
};

export default App;
