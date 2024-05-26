import { USER } from "./USER";

export interface BURGER {
	_id: string;
	owner: USER;
	description: string;
	discount: number;
	kind: boolean;
	likes: number;
	price: number;
	title: string;
	displayImg: string;
}
