import { IDENTIFICATION } from "@owlebot/lib";

export class UsersService {
	#requester;

	constructor(requester) {
		this.#requester = requester;
	}

	async getUser(id, context) {
		const res = await this.#requester.get(IDENTIFICATION.USERS._.resolve(id), null, { context } );
		if (res.ok) {
			return res.data;
		}
		return null;
	}
}
