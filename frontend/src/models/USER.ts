import { BURGER } from "./BURGER";

export interface USER {
	_id: string;
	name: string;
	email: string;
	ownedBurgers: BURGER[];
	thumbnailImg: string;
}
