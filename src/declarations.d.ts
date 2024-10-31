declare module "three/examples/jsm/loaders/STLLoader" {
	import { Loader } from "three";
	import { BufferGeometry } from "three";

	export class STLLoader extends Loader {
		constructor();
		load(
			url: string,
			onLoad: (geometry: BufferGeometry) => void,
			onProgress?: (event: ProgressEvent) => void,
			onError?: (event: ErrorEvent) => void
		): void;
		parse(data: ArrayBuffer | string): BufferGeometry;
	}
}

declare const loaded3DModels: {
	name: string;
	url: string;
	position: [number, number, number];
	scale?: [number, number, number];
	rotation?: [number, number, number];
	color?: string;
}[];
