import { Community } from "./community.dto.js";

export interface User {
	id: string;
	communities: Community[]
}
