import { BufferGeometry } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";

const Model = ({
	url,
	position,
	scale,
	rotation,
	color = "#E0E0E0",
}: {
	url: string;
	position: [number, number, number];
	scale?: [number, number, number];
	rotation?: [number, number, number];
	color?: string;
}) => {
	const geometry = useLoader(STLLoader, url) as BufferGeometry;

	return (
		<mesh geometry={geometry} position={position} scale={scale} rotation={rotation}>
			<meshStandardMaterial attach="material" color={color} />
		</mesh>
	);
};

export default Model;
