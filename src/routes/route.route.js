import { createRouter, ServerResponse } from "@owlebot/lib";

import { RouteService } from "../services/route.service.js";

export function createUsersRoute() {
	const router = createRouter();
	const service = new RouteService();

	router.get("/", (req, res) => {
		const data = service.get();
		
		return ServerResponse.sendSuccess(res, data);
	} );

	return router;
}
