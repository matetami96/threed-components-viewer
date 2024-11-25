// import { CompsByStepType } from "./App.types";

declare module "three/examples/jsm/loaders/STLLoader" {
	import { Loader } from "three";
	import { BufferGeometry } from "three";

	export class STLLoader extends Loader {
		constructor();
		load(
			url: string,
			onLoad: (geometry: BufferGeometry) => void,
			onProgress: (event: ProgressEvent) => void,
			onError?: (event: ErrorEvent) => void
		): void;
		parse(data: ArrayBuffer | string): BufferGeometry;
	}
}

declare global {
	const apiBaseUrl: string;
	const compsByStep: CompsByStepType;
	const threed_files: {
		code: string;
		comp_type: string;
		name: string;
		quantity: number;
		amount: number;
		discount: string;
		base_price: number;
		discounted_price: number;
		url: string;
		"3d_file": string | null;
		id: number;
	}[];
}

export {};
