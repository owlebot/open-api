import { createRouter, ErrorStatusEnum, ServerResponse, TEMPLATE } from "@owlebot/lib";
import { Logger } from "@owlebot/logger";

import { UsersService } from "../services/users.service.js";

export function createUsersRoute(requester) {
	const router = createRouter();
	const service = new UsersService(requester);

	router.get(TEMPLATE.USERS._.def(":id"), async(req, res) => {
		const data = await service.getUser(req.params.id, req);
		if (data) {
			Logger.info(data);
			return ServerResponse.sendSuccess(res, data);
		}
		return ServerResponse.sendError(res, ErrorStatusEnum.ERROR);
	} );

	return router;
}
