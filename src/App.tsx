import { Canvas, useThree } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
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

const apiBaseUrl = "https://m.admin.fallprotec.underdevelopment.ro";
const threed_files = [
	{
		code: "FP001",
		comp_type: "system_accessory_mandatory",
		name: "Marking kit",
		quantity: 1,
		amount: 1,
		discount: "50.0",
		base_price: 2,
		discounted_price: 1,
		url: "http://cs.dealer.fallprotec.underdevelopment.ro/userfiles/components/photos/d06b6c54863ac33d12419dd04f7acb85c696f722.png?62ij08badQNW-Z0XR84TdQGzEqwDYy5A",
		"3d_file": "FP001 Kit de marquage.stl",
		id: 542,
	},
	{
		code: "IDF012=170",
		comp_type: "id_component_fixation_element_end_accessory",
		name: "Felt roof seal \u00d875-90 height 170 mm",
		quantity: 4,
		amount: 90,
		discount: "50.0",
		base_price: 45,
		discounted_price: 22.5,
		url: "http://cs.dealer.fallprotec.underdevelopment.ro/userfiles/components/photos/5d00f2c62873169a8720963189ff86b1f29d4958.jpg?R1V0VyGVEmi2b8dhFPL7hxsIdNJFn9cg",
		"3d_file": null,
		id: 261,
	},
	{
		code: "IDF018",
		comp_type: "id_component_fixation_element",
		name: "Post height 50 cm for inter anchor EVO and anchor point LDV029",
		quantity: 16,
		amount: 544,
		discount: "50.0",
		base_price: 68,
		discounted_price: 34,
		url: "http://cs.dealer.fallprotec.underdevelopment.ro/userfiles/components/photos/6c41101fe24a8f80c8cb51781f9e9ecf8c7a4d39.jpg?NV1XfDDmoj26VzTO5HghDSdOtLl0n5tV",
		"3d_file": "IDF018 Ensemble potelet 500 mm galva pour ancre interme\u0301diaire.stl",
		id: 339,
	},
	{
		code: "IDF019",
		comp_type: "id_component_fixation_element_end",
		name: "Post height 50 cm for end anchor and curves",
		quantity: 4,
		amount: 155,
		discount: "50.0",
		base_price: 77.5,
		discounted_price: 38.75,
		url: "http://cs.dealer.fallprotec.underdevelopment.ro/userfiles/components/photos/01ec40215edd21ed26d1bedde644afcfa4ccd665.jpg?HNv8ZY5ch9RCyDybPKZCexTN8tdLbxXn",
		"3d_file": "IDF019 Ensemble potelet 500 mm galva pour ancre terminale et courbe.stl",
		id: 338,
	},
	{
		code: "LDV001",
		comp_type: "id_component_glider",
		name: "Opening glider for ground or wall configuration",
		quantity: 1,
		amount: 87.5,
		discount: "50.0",
		base_price: 175,
		discounted_price: 87.5,
		url: "http://cs.dealer.fallprotec.underdevelopment.ro/userfiles/components/photos/4dc77829a69518101f9a97ef4257e3a7820944d2.jpg?gpEl5oR5XfCFA45LP7Gdwi99W1tVnORM",
		"3d_file": "LDV001 Coulisseau 2015 avec mousqueton.stl",
		id: 417,
	},
	{
		code: "LDV002",
		comp_type: "id_component_end_anchor",
		name: "End or top anchor for horizontal, inclined or vertical lifeline",
		quantity: 2,
		amount: 85,
		discount: "50.0",
		base_price: 85,
		discounted_price: 42.5,
		url: "http://cs.dealer.fallprotec.underdevelopment.ro/userfiles/components/photos/12c6fc06c99a462375eeb3f43dfd832b08ca9e17.png?mTHEynQnDCHTmq2kqmGa0rxiOI9juxaK",
		"3d_file": "LDV002 Ancre terminale 2012.stl",
		id: 22,
	},
	{
		code: "LDV005",
		comp_type: "id_component_core",
		name: "Cable \u00d8 8 mm construction 1x19",
		quantity: 204,
		amount: 459,
		discount: "50.0",
		um: "m",
		base_price: 4.5,
		discounted_price: 2.25,
		url: "http://cs.dealer.fallprotec.underdevelopment.ro/userfiles/components/photos/f6e1126cedebf23e1463aee73f9df08783640400.png?ReEphuqCWq2jkVYDQfd1qSdKC31RHnuk",
		"3d_file": null,
		id: 25,
	},
	{
		code: "LDV008",
		comp_type: "id_component_terminal_a subcomponent",
		name: "Crimping ring length 100 mm",
		quantity: 1,
		amount: 5,
		discount: "50.0",
		base_price: 10,
		discounted_price: 5,
		url: "http://cs.dealer.fallprotec.underdevelopment.ro/userfiles/components/photos/bc33ea4e26e5e1af1408321416956113a4658763.png?Gx9txo_1ZQ-8hfFo8HmkMwzU4CCuxdlh",
		"3d_file": "LDV008 Bague de sertissage.stl",
		id: 27,
	},
	{
		code: "LDV011",
		comp_type: "id_component_corner subcomponent",
		name: "Crimping ring length 30 mm",
		quantity: 6,
		amount: 9,
		discount: "50.0",
		base_price: 3,
		discounted_price: 1.5,
		url: "http://cs.dealer.fallprotec.underdevelopment.ro/userfiles/components/photos/7719a1c782a1ba91c031a682a0a2f8658209adbf.jpg?YJMh0XYrS4B1hlcEQ_RTvd6XiYPp4fEL",
		"3d_file": "LDV011 Bague de sertissage pour courbe.stl",
		id: 29,
	},
	{
		code: "LDV015",
		comp_type: "id_component_corner subcomponent",
		name: "Corner plate for angle between 45\u00b0 to 140\u00b0 for Multipost, Unipost & rigigid post",
		quantity: 2,
		amount: 50,
		discount: "50.0",
		base_price: 50,
		discounted_price: 25,
		url: "http://cs.dealer.fallprotec.underdevelopment.ro/userfiles/components/photos/632667547e7cd3e0466547863e1207a8c0c0c549.png?B27XpwWfcqzSfzN11PGTFOSPs7Y8VtAt",
		"3d_file": "LDV015 Plaque pour courbe sur Multipost.stl",
		id: 31,
	},
	{
		code: "LDV032",
		comp_type: "id_component_terminal_a subcomponent",
		name: "Energy absorber provided with spring",
		quantity: 1,
		amount: 52.5,
		discount: "50.0",
		base_price: 105,
		discounted_price: 52.5,
		url: "http://cs.dealer.fallprotec.underdevelopment.ro/userfiles/components/photos/5b384ce32d8cdef02bc3a139d4cac0a22bb029e8.jpg?Wco7l6qygzErdnpCiqMeJw5OLIZ2j-ee",
		"3d_file": "LDV032 Absorbeur d_e\u0301nergie avec ressort.stl",
		id: 38,
	},
	{
		code: "LDV043",
		comp_type: "id_component_corner subcomponent",
		name: "NEO Anchor for horizontal or inclined lifeline",
		quantity: 20,
		amount: 750,
		discount: "50.0",
		base_price: 75,
		discounted_price: 37.5,
		url: "http://cs.dealer.fallprotec.underdevelopment.ro/userfiles/components/photos/1f0037c5e92481b35c84bc22d7e8f69c34365430.jpg?1xaxM9LZhCs-PTIstR_WC7z_g4-T-mZE",
		"3d_file": "LDV043 Ancre Interme\u0301diaire NEO 2015 _120 deg_.stl",
		id: 419,
	},
	{
		code: "LDV058",
		comp_type: "id_component_fixation_element_accessory",
		name: "Roofmate 23 x 23 x 1 cm",
		quantity: 16,
		amount: 64,
		discount: "50.0",
		base_price: 8,
		discounted_price: 4,
		url: "http://cs.dealer.fallprotec.underdevelopment.ro/userfiles/components/photos/fb644351560d8296fe6da332236b1f8d61b2828a.jpg?cxx1rFAI0mab9tx-X0v9j3H4rQmtkT5E",
		"3d_file": "LDV058 Plaque Isolante Antivibratoire 235x235x10.stl",
		id: 45,
	},
	{
		code: "LDV137",
		comp_type: "id_component_terminal_b",
		name: "Line tensioner",
		quantity: 1,
		amount: 27.5,
		discount: "50.0",
		base_price: 55,
		discounted_price: 27.5,
		url: "http://cs.dealer.fallprotec.underdevelopment.ro/userfiles/components/photos/6c0ac76ca9fe1af889558d11fd9a75e1fb9a0b86.jpg?e-3qcDMXzDP_3N9OcgeeO7SpDB1oxhHp",
		"3d_file": "LDV137 Tendeur de ligne.stl",
		id: 431,
	},
];
const compsByStep = {
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
						{ start: [0, 0, 0], end: [0, 0, -50] },
						{ start: [0, 0, -50], end: [100, 0, -50] },
						{ start: [100, 0, -50], end: [100, 0, 0] },
					],
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
								[2.4, -0.6, -48],
								[97.6, -0.6, -48],
							],
							rotations: [
								[1.58, 0, -0.75],
								[1.58, 0, 0.75],
							],
							scale: [0.05, 0.05, 0.05],
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
							url: `${apiBaseUrl}/userfiles/components/3d/419/LDV043 Ancre Interme\u0301diaire NEO 2015 _120 deg_.stl`,
							// url: `${apiBaseUrl}/userfiles/components/3d/419/LDV043 Ancre Intermédiaire NEO 2015 _droit_.stl`,
							positions: [
								[-2.6, 1.5, -43.2],
								[7.6, 1.5, -52.6],
								[92.5, 1.5, -52.6],
								[102.6, 1.5, -43.2],
							],
							rotations: [
								[0, 3.15, 0],
								[0, 1.57, 0],
								[0, 1.57, 0],
								[0, 0, 0],
							],
							scale: [0.05, 0.05, 0.05],
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
								[0, 0, -45.7],
								[5.1, 0, -50],
								[94.9, 0, -50],
								[100, 0, -45.7],
							],
							rotations: [
								[0, 0, 0],
								[0, 1.57, 0],
								[0, 1.57, 0],
								[0, 0, 0],
							],
							scale: [0.05, 0.05, 0.05],
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
						[0, -5, -0.7],
						[100, -5, -0.7],
					],
					rotations: [
						[1.57, 3.15, 1.57],
						[1.57, 3.15, 1.57],
					],
					scale: [0.05, 0.05, 0.05],
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
			},
		],
		id_component_fixation_element_end: [
			{
				id: 338,
				code: "IDF019",
				name: "Post height 50 cm for end anchor, curves & intermediates",
				quantity: 2,
				price: null,
			},
		],
		id_component_fixation_element_end_accessory: [
			{
				id: 261,
				code: "IDF012=170",
				name: "Felt roof seal Ø75-90 height 170 mm",
				quantity: 2,
				price: null,
			},
		],
		id_component_fixation_element: [
			{
				id: 339,
				code: "IDF018",
				name: "Post height 50 cm for inter anchor EVO and anchor point LDV029",
				quantity: 18,
				price: null,
			},
		],
		id_component_fixation_element_accessory: [
			{
				id: 45,
				code: "LDV058",
				name: "Roofmate 23 x 23 x 1 cm",
				quantity: 18,
				price: null,
			},
		],
		id_component_terminal_a: [
			{
				id: 553,
				code: "LDV032#1",
				name: "Energy absorber provided with spring",
				quantity: 1,
				price: null,
			},
		],
		id_component_terminal_b: [
			{
				id: 431,
				code: "LDV137",
				name: "Line tensioner",
				quantity: 1,
				price: null,
			},
		],
		id_component_glider: [
			{
				id: 417,
				code: "LDV001",
				name: "Opening glider for ground or wall configuration",
				quantity: 1,
				price: null,
			},
		],
		system_accessory_mandatory: [
			{
				id: 29,
				code: "LDV011",
				name: "Crimping ring length 30 mm",
				quantity: 2,
				price: null,
			},
		],
	},
};

const CanvasWrapper = ({ loadedModels }: { loadedModels: Loaded3DModels }) => {
	const models: JSX.Element[] = [];
	const { viewport } = useThree();

	for (const key in compsByStep.components) {
		if (key === "id_component_core" && compsByStep.components[key][0].model_details.model_type === "2d_line") {
			const details = compsByStep.components[key][0].model_details;

			for (let i = 0; i < details.quantity; i++) {
				models.push(
					<Line
						key={`id_component_core-${i}`}
						points={[
							details.positions[i].start as [number, number, number],
							details.positions[i].end as [number, number, number],
						]}
						color={details.color}
						lineWidth={details.scale}
					/>
				);
			}
		}

		if (key === "id_component_corner" && compsByStep.components[key][0].subcomponents) {
			const subComponents = compsByStep.components[key][0].subcomponents;

			for (let i = 0; i < subComponents.length; i++) {
				const details = subComponents[i].model_details;

				if (details.model_type === "3d") {
					for (let j = 0; j < details.quantity; j++) {
						models.push(
							<Model
								key={`id_component_corner-${i}-${j}`}
								url={details.url}
								position={details.positions[j] as [number, number, number]}
								scale={details.scale as [number, number, number]}
								rotation={details.rotations[j] as [number, number, number]}
								color={details.color}
							/>
						);
					}
				}
			}
		}

		if (key === "id_component_end_anchor" && compsByStep.components[key][0].model_details.model_type === "3d") {
			const details = compsByStep.components[key][0].model_details;

			for (let i = 0; i < details.quantity; i++) {
				models.push(
					<Model
						key={`id_component_end_anchor-${i}`}
						url={details.url}
						position={details.positions[i] as [number, number, number]}
						scale={details.scale as [number, number, number]}
						rotation={details.rotations[i] as [number, number, number]}
						color={details.color}
					/>
				);
			}
		}
	}

	loadedModels.map((model, index) => {
		models.push(
			<Model
				key={`model-${index}`}
				url={model.url}
				position={[/* -viewport.width / 2 + 100 + index * 2 */ 0 - (index + 1) * 100, viewport.height / 2 - 50, 0]}
				scale={model.scale}
				rotation={model.rotation}
				color={model.color}
			/>
		);
	});

	return models;
};

const App = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [loadedModels] = useState<Loaded3DModels | []>(
		threed_files
			.filter((file) => file["3d_file"] !== null)
			.map((threed_file) => ({
				name: threed_file["code"],
				url: `${apiBaseUrl}/userfiles/components/3d/${threed_file["id"]}/${threed_file["3d_file"]!}`,
				position: [0, 0, 0],
				scale: [0.05, 0.05, 0.05],
				rotation: [0, 0, 0],
				color: "grey",
			}))
	);

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
			{loadedModels.length > 0 ? (
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
						<CanvasWrapper loadedModels={loadedModels} />
						{/* <Model
							url={`${apiBaseUrl}/userfiles/components/3d/wire_rope/wire_rope.stl`}
							position={[0, 0, 0]}
							scale={[5, 5, 5]}
							rotation={[-Math.PI / 2, 0, 0]}
							color="red"
						/>
						<Model
							url={`${apiBaseUrl}/userfiles/components/3d/wire_rope/wire_rope.stl`}
							position={[0, 76, 0]}
							scale={[5, 5, 10]}
							rotation={[0, 1.57, 0]}
							color="green"
						/>
						<Model
							url={`${apiBaseUrl}/userfiles/components/3d/wire_rope/wire_rope.stl`}
							position={[0 + 152, 0, 0]}
							scale={[5, 5, 5]}
							rotation={[-Math.PI / 2, 0, 0]}
							color="blue"
						/> */}
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
