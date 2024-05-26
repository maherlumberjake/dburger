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
	comments: [
		{
			_id: string;
			comment: string;
			timestamp: string;
			byUser: {
				name: string;
				_id: string;
				thumbnailImg: string;
			};
		}
	];
}
