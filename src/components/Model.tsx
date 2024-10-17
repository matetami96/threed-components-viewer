import { BufferGeometry } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";

const Model = ({ position, url }: { position: [number, number, number]; url: string }) => {
	const geometry = useLoader(STLLoader, url) as BufferGeometry;

	return (
		<mesh geometry={geometry} position={position}>
			<meshStandardMaterial attach="material" color="#E0E0E0" />
		</mesh>
	);
};

export default Model;
