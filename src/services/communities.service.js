import { IDENTIFICATION } from "@owlebot/lib";

export class CommunitiesService {
	#requester;

	constructor(requester) {
		this.#requester = requester;
	}

	async getCommunity(id, context) {
		const res = await this.#requester.get(IDENTIFICATION.COMMUNITIES._.resolve(id), null, { context } );
		if (res.ok) {
			return res.data.map(e => e.name).join(",");
		}
		return [];
	}

	getMember(communityId, userId, context) {
		return this.#requester.get(IDENTIFICATION.COMMUNITIES._.MEMBERS._.resolve(communityId, userId), null, { context } );
	}
}
