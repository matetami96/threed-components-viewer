import { Canvas /* useThree */ } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import { CompsByStepType, PositionOrRotation } from "./App.types";
import Model from "./components/Model";
import { createCurvePoints, enterFullscreen } from "./utils/utils";
import Spinner from "./components/Spinner";

const apiBaseUrl = "https://m.admin.fallprotec.underdevelopment.ro";
const compsByStep: CompsByStepType = {
	wizard_key: "cable_horizontal",
	price_list_info: {
		price_list_id: 1,
		price_list_code: "1",
		price_list_name: "Euro",
		price_currency: "EUR",
		price_show: true,
		discount: "55.0",
		markup: 0,
	},
	length_net: 200,
	length_brut: 204,
	components: {
		id_component_core: [
			{
				id: 25,
				code: "LDV005",
				name: "Cable Ø 8 mm construction 1x19",
				quantity: 204, // 50 + 100 + 50
				um: "m",
				price: null,
				model_details: {
					model_type: "2d_line",
					quantity: 3,
					positions: [
						[0, 0, 0],
						[0, 0, -54 + 4 / Math.PI],
						...createCurvePoints([0, 0, -54 + 4 / Math.PI], 4 / Math.PI, "up-right"),
						[4 / Math.PI, 0, -54],
						[100 - 4 / Math.PI, 0, -54],
						...createCurvePoints([100 - 4 / Math.PI, 0, -54], 4 / Math.PI, "down-right"),
						[100, 0, -54 + 4 / Math.PI],
						[100, 0, 0],
					],
					// positions: [
					// 	{ start: [0, 0, 0], end: [0, 0, -50] },
					// 	{ start: [0, 0, -50], end: [100, 0, -50] },
					// 	{ start: [100, 0, -50], end: [100, 0, 0] },
					// ],
					scale: 8,
					color: "gray",
				},
			},
		],
		id_component_corner: [
			{
				id: 570,
				code: "LDV015+LDV043x2+LDV011x2",
				name: "Corner 45° to 135° LDV015 with intermediate anchors NEO LDV043 and crimping rings LDV011",
				quantity: 2,
				subcomponents: [
					{
						id: 31,
						code: "LDV015",
						name: "Corner plate for angle between 45° to 140° for Multipost, Unipost & rigid post",
						quantity: 2,
						price: {
							base: 50,
							final: 22.5,
						},
						model_details: {
							model_type: "3d",
							quantity: 2,
							url: `${apiBaseUrl}/userfiles/components/3d/31/LDV015 Plaque pour courbe sur Multipost.stl`,
							positions: [
								[3.4, -2.7, -50.6],
								[96.6, -2.7, -50.6],
							],
							rotations: [
								[1.58, 0, -0.78],
								[1.58, 0, 0.78],
							],
							scale: [0.035, 0.035, 0.035],
							color: "gray",
						},
					},
					{
						id: 419,
						code: "LDV043",
						name: "NEO Anchor for horizontal or inclined lifeline",
						quantity: 4,
						price: null,
						model_details: {
							model_type: "3d",
							quantity: 4,
							url: `${apiBaseUrl}/userfiles/components/3d/419/LDV043 Ancre Intermédiaire NEO 2015 _droit_.stl`,
							positions: [
								[0, -1.55, -47.1],
								[6.9, -1.55, -54],
								[93.1, -1.55, -54],
								[100, -1.55, -47.1],
							],
							rotations: [
								[0, 3.15, 0],
								[0, 1.57, 0],
								[0, 1.57, 0],
								[0, 0, 0],
							],
							scale: [0.03, 0.026, 0.03],
							color: "gray",
						},
					},
					{
						id: 29,
						code: "LDV011",
						name: "Crimping ring length 30 mm",
						quantity: 4,
						price: null,
						model_details: {
							model_type: "3d",
							quantity: 4,
							url: `${apiBaseUrl}/userfiles/components/3d/29/LDV011 Bague de sertissage pour courbe.stl`,
							positions: [
								[0, 0, -48.6],
								[5.4, 0, -54],
								[94.6, 0, -54],
								[100, 0, -48.6],
							],
							rotations: [
								[0, 0, 0],
								[0, 1.57, 0],
								[0, 1.57, 0],
								[0, 0, 0],
							],
							scale: [0.035, 0.035, 0.035],
							color: "gray",
						},
					},
				],
			},
		],
		id_component_end_anchor: [
			{
				id: 22,
				code: "LDV002",
				name: "End or top anchor for horizontal or inclined  lifeline",
				quantity: 2,
				price: null,
				model_details: {
					model_type: "3d",
					quantity: 2,
					url: `${apiBaseUrl}/userfiles/components/3d/22/LDV002 Ancre terminale 2012.stl`,
					positions: [
						[0, -2.8, -0.5],
						[100, -2.8, -0.5],
					],
					rotations: [
						[1.57, 3.15, 1.57],
						[1.57, 3.15, 1.57],
					],
					scale: [0.028, 0.028, 0.028],
					color: "gray",
				},
			},
		],
		id_component_intermediate_anchor: [
			{
				id: 419,
				code: "LDV043",
				name: "NEO Anchor for horizontal or inclined lifeline",
				quantity: 16,
				price: null,
				model_details: {
					model_type: "3d",
					quantity: 16,
					url: `${apiBaseUrl}/userfiles/components/3d/419/LDV043 Ancre Intermédiaire NEO 2015 _droit_.stl`,
					positions: [
						[0, -1.8, -10],
						[0, -1.8, -20],
						[0, -1.8, -30],
						[0, -1.8, -40], // 50
						[11.2, -1.8, -54],
						[22.4, -1.8, -54],
						[33.6, -1.8, -54],
						[44.8, -1.8, -54],
						[56.2, -1.8, -54],
						[66.4, -1.8, -54],
						[77.6, -1.8, -54],
						[88.8, -1.8, -54], // 100
						[100, -1.8, -40],
						[100, -1.8, -30],
						[100, -1.8, -20],
						[100, -1.8, -10], // 50
					],
					rotations: [
						[0, 3.15, 0],
						[0, 3.15, 0],
						[0, 3.15, 0],
						[0, 3.15, 0], // 50
						[0, 1.57, 0],
						[0, 1.57, 0],
						[0, 1.57, 0],
						[0, 1.57, 0],
						[0, 1.57, 0],
						[0, 1.57, 0],
						[0, 1.57, 0],
						[0, 1.57, 0], // 100
						[0, 0, 0],
						[0, 0, 0],
						[0, 0, 0],
						[0, 0, 0], // 50
					],
					scale: [0.03, 0.03, 0.03],
					color: "gray",
				},
			},
		],
		id_component_fixation_element_end: [
			{
				id: 338,
				code: "IDF019",
				name: "Post height 50 cm for end anchor, curves & intermediates",
				quantity: 4,
				price: null,
				model_details: {
					model_type: "3d",
					quantity: 4,
					url: `${apiBaseUrl}/userfiles/components/3d/338/IDF019 Ensemble potelet 500 mm galva pour ancre terminale et courbe.stl`,
					positions: [
						[0, -8.8, -0.5],
						[3.4, -8.8, -50.6],
						[96.6, -8.8, -50.6],
						[100, -8.8, -0.5],
					],
					rotations: [
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
					],
					scale: [0.02, 0.02, 0.012],
					color: "gray",
				},
			},
		],
		id_component_fixation_element_end_accessory: [
			{
				id: 261,
				code: "IDF012=170",
				name: "Felt roof seal Ø75-90 height 170 mm",
				quantity: 4,
				price: null,
				model_details: {
					model_type: "3d",
					quantity: 4,
					url: `${apiBaseUrl}/userfiles/components/3d/45/LDV058 Plaque Isolante Antivibratoire 235x235x10.stl`,
					positions: [
						[0, -8.8, -0.5],
						[3.4, -8.8, -50.6],
						[96.6, -8.8, -50.6],
						[100, -8.8, -0.5],
					],
					rotations: [
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
					],
					scale: [0.02, 0.02, 0.02],
					color: "gray",
				},
			},
		],
		id_component_fixation_element: [
			{
				id: 339,
				code: "IDF018",
				name: "Post height 50 cm for inter anchor EVO and anchor point LDV029",
				quantity: 16,
				price: null,
				model_details: {
					model_type: "3d",
					quantity: 16,
					url: `${apiBaseUrl}/userfiles/components/3d/339/IDF018 Ensemble potelet 500 mm galva pour ancre intermédiaire.stl`,
					positions: [
						[0, -8.8, -10],
						[0, -8.8, -20],
						[0, -8.8, -30],
						[0, -8.8, -40],
						[11.2, -8.8, -54],
						[22.4, -8.8, -54],
						[33.6, -8.8, -54],
						[44.8, -8.8, -54],
						[56.2, -8.8, -54],
						[66.4, -8.8, -54],
						[77.6, -8.8, -54],
						[88.8, -8.8, -54],
						[100, -8.8, -40],
						[100, -8.8, -30],
						[100, -8.8, -20],
						[100, -8.8, -10],
					],
					rotations: [
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
						[-1.57, 0, 0],
					],
					scale: [0.02, 0.02, 0.012],
					color: "gray",
				},
			},
		],
		id_component_fixation_element_accessory: [
			{
				id: 45,
				code: "LDV058",
				name: "Roofmate 23 x 23 x 1 cm",
				quantity: 16,
				price: null,
				model_details: {
					model_type: "3d",
					quantity: 16,
					url: `${apiBaseUrl}/userfiles/components/3d/45/LDV058 Plaque Isolante Antivibratoire 235x235x10.stl`,
					positions: [
						[0, -8.8, -10],
						[0, -8.8, -20],
						[0, -8.8, -30],
						[0, -8.8, -40],
						[11.2, -8.8, -54],
						[22.4, -8.8, -54],
						[33.6, -8.8, -54],
						[44.8, -8.8, -54],
						[56.2, -8.8, -54],
						[66.4, -8.8, -54],
						[77.6, -8.8, -54],
						[88.8, -8.8, -54],
						[100, -8.8, -40],
						[100, -8.8, -30],
						[100, -8.8, -20],
						[100, -8.8, -10],
					],
					rotations: [
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
						[1.57, 0, 0],
					],
					scale: [0.02, 0.02, 0.02],
					color: "gray",
				},
			},
		],
		id_component_terminal_a: [
			{
				id: 553,
				code: "LDV032#1+LDV008",
				name: "Energy absorber provided with spring and Crimping ring length 100 mm",
				quantity: 1,
				price: null,
				subcomponents: [
					{
						id: 38,
						code: "LDV032",
						name: "Energy absorber provided with spring",
						quantity: 1,
						price: null,
						model_details: {
							model_type: "3d",
							quantity: 1,
							url: `${apiBaseUrl}/userfiles/components/3d/38/LDV032 Absorbeur d_énergie avec ressort.stl`,
							positions: [[0, 0, 3.1]],
							rotations: [[0, -1.57, 0]],
							scale: [0.016, 0.016, 0.016],
							color: "gray",
						},
					},
					{
						id: 27,
						code: "LDV008",
						name: "Crimping ring length 100 mm",
						quantity: 1,
						price: null,
						model_details: {
							model_type: "3d",
							quantity: 1,
							url: `${apiBaseUrl}/userfiles/components/3d/27/LDV008 Bague de sertissage.stl`,
							positions: [[0, 0, 6.3]],
							rotations: [[0, 0, 0]],
							scale: [0.03, 0.03, 0.03],
							color: "gray",
						},
					},
				],
			},
		],

		id_component_terminal_b: [
			{
				id: 431,
				code: "LDV137",
				name: "Line tensioner",
				quantity: 1,
				price: null,
				model_details: {
					model_type: "3d",
					quantity: 1,
					url: `${apiBaseUrl}/userfiles/components/3d/431/LDV137 Tendeur de ligne.stl`,
					positions: [[97, 0, -0.6]],
					rotations: [[0, 1.57, 0]],
					scale: [0.03, 0.03, 0.03],
					color: "gray",
				},
			},
		],
		id_component_glider: [
			{
				id: 417,
				code: "LDV001",
				name: "Opening glider for ground or wall configuration",
				quantity: 1,
				price: null,
				model_details: {
					model_type: "3d",
					quantity: 1,
					url: `${apiBaseUrl}/userfiles/components/3d/417/LDV001 Coulisseau 2015 avec mousqueton.stl`,
					positions: [[0, 0, -5]],
					rotations: [[0, 0, 2]],
					scale: [0.04, 0.04, 0.04],
					color: "gray",
				},
			},
		],
		system_accessory_mandatory: [
			{
				id: 999, // random id after rewriting system_accessory_mandatory
				// id: 29,
				code: "LDV011, FP001",
				name: "Crimping ring length 30 mm and Marking kit",
				quantity: 2,
				price: null,
				subcomponents: [
					{
						id: 29,
						code: "LDV011",
						name: "Crimping ring length 30 mm",
						quantity: 2,
						price: null,
						model_details: {
							model_type: "3d",
							quantity: 2,
							url: `${apiBaseUrl}/userfiles/components/3d/29/LDV011 Bague de sertissage pour courbe.stl`,
							positions: [
								[46.3, 0, -54],
								[54.7, 0, -54],
							],
							rotations: [
								[0, 1.57, 0],
								[0, 1.57, 0],
							],
							scale: [0.035, 0.035, 0.035],
							color: "gray",
						},
					},
					{
						id: 542,
						code: "FP001",
						name: "Marking kit",
						quantity: 1,
						price: null,
						model_details: {
							model_type: "3d",
							quantity: 1,
							url: `${apiBaseUrl}/userfiles/components/3d/542/FP001 Kit de marquage.stl`,
							positions: [[-15, 0, 0]],
							rotations: [
								[0, 0, 0],
								[0, 0, 0],
							],
							scale: [0.04, 0.04, 0.04],
							color: "gray",
						},
					},
				],
			},
		],
	},
};

const CanvasWrapper = () => {
	const models: JSX.Element[] = [];
	// const { viewport } = useThree();

	for (const key in compsByStep.components) {
		if (compsByStep.components[key][0].subcomponents) {
			const subComponents = compsByStep.components[key][0].subcomponents;

			for (let i = 0; i < subComponents.length; i++) {
				const details = subComponents[i].model_details!;

				if (details.model_type === "3d") {
					for (let j = 0; j < details.quantity; j++) {
						models.push(
							<Model
								key={uuidv4()}
								url={details.url!}
								position={details.positions[j] as [number, number, number]}
								scale={details.scale as [number, number, number]}
								rotation={details.rotations![j] as [number, number, number]}
								color={details.color}
							/>
						);
					}
				}
			}
		} else if (compsByStep.components[key][0].model_details) {
			const details = compsByStep.components[key][0].model_details!;

			switch (details.model_type) {
				case "2d_line":
					// console.log(details.positions);
					models.push(
						<Line
							key={uuidv4()}
							points={details.positions as PositionOrRotation[]}
							color={details.color}
							lineWidth={details.scale as number}
						/>
					);
					/* for (let i = 0; i < details.quantity; i++) {
						models.push(
							<Line
								key={uuidv4()}
								points={[
									(details.positions[i] as { start: PositionOrRotation; end: PositionOrRotation }).start,
									(details.positions[i] as { start: PositionOrRotation; end: PositionOrRotation }).end,
								]}
								color={details.color}
								lineWidth={details.scale as number}
							/>
						);
					} */
					break;
				case "3d":
					for (let i = 0; i < details.quantity; i++) {
						models.push(
							<Model
								key={uuidv4()}
								url={details.url!}
								position={details.positions[i] as [number, number, number]}
								scale={details.scale as [number, number, number]}
								rotation={details.rotations![i] as [number, number, number]}
								color={details.color}
							/>
						);
					}
					break;
				default:
					break;
			}
		}
	}

	return models;
};

const App = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
			{Object.keys(compsByStep.components).length > 0 ? (
				<Canvas
					camera={{
						position: [0, 100, 100],
						fov: 50,
						near: 1,
						far: 10000,
					}}
					onTouchMove={(e) => e.stopPropagation()}
				>
					<ambientLight intensity={0.5} />
					<pointLight position={[10, 10, 10]} intensity={1} />
					<directionalLight position={[-2, 5, 2]} intensity={1} />
					<Suspense fallback={<Spinner />}>
						<CanvasWrapper />
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
