import { createRouter, ErrorStatusEnum, ServerResponse, TEMPLATE } from "@owlebot/lib";

import { CommunitiesService } from "../services/communities.service.js";

export function createCommunitiesRoute(requester) {
	const router = createRouter();
	const service = new CommunitiesService(requester);

	router.get(TEMPLATE.COMMUNITIES._.def(":id"), async(req, res) => {
		const data = await service.getCommunity(req.params.id, req);
		return ServerResponse.sendSuccess(res, data);
	} );

	router.get(TEMPLATE.COMMUNITIES._.MEMBERS._.def(":communityId", ":userId"), async(req, res) => {
		const data = await service.getMember(req.params.communityId, req.params.userId, req);
		return ServerResponse.send(res, data.ok, data.data, ErrorStatusEnum.ERROR);
	} );

	return router;
}
