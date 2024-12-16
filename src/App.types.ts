import { RootState } from "@react-three/fiber";

export type Loaded3DModels = {
	name: string;
	url: string;
	position: [number, number, number];
	scale?: [number, number, number];
	rotation?: [number, number, number];
	color?: string;
}[];

export type PriceListInfo = {
	price_list_id: number;
	price_list_code: string;
	price_list_name: string;
	price_currency: string;
	price_show: boolean;
	discount: string;
	markup: number;
};

export type PositionOrRotation = [number, number, number];

export type ModelDetailsType = {
	model_type: string;
	quantity: number;
	url?: string;
	positions: PositionOrRotation[] | { start: PositionOrRotation; end: PositionOrRotation }[];
	rotations?: PositionOrRotation[];
	scale: [number, number, number] | number;
	color: string;
};

export type SubComponentType = {
	id: number;
	code: string;
	name: string;
	quantity: number;
	price:
		| number
		| {
				base?: number;
				final?: number;
		  }
		| null;
	model_details?: ModelDetailsType;
};

export type ComponentType = {
	id: number;
	code: string;
	name: string;
	quantity: number;
	um?: string;
	price?: {
		base?: number;
		final?: number;
	} | null;
	model_details?: ModelDetailsType;
	subcomponents?: SubComponentType[];
};

export type ComponentsType = {
	[key: string]: ComponentType[];
};

export type CompsByStepType = {
	wizard_key: string;
	price_list_info: PriceListInfo;
	length_net?: number;
	length_brut?: number;
	components: ComponentsType;
};

export type CanvasWrapperProps = {
	onReady: (context: RootState) => void;
};
