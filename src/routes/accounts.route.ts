import { OPEN_API } from "@owlebot/lib/endpoints";
import {
	Controller,
	Get,
	Path,
	Request,
	Route,
	Security,
} from "tsoa";

import { User } from "../dto/output/user.dto.js";
import { UsersService } from "../services/users.service.js";

@Route(OPEN_API.ACCOUNTS.router() )
export class AccountsController extends Controller {
	usersService = new UsersService();

	@Get(OPEN_API.ACCOUNTS._.USER.COMMUNITIES.def("{accountId}") )
	@Security("api_key")
	public async getUserCommunities(
		@Request() req: Request,
		@Path() accountId: string,
	): Promise<User | null> {
		return this.usersService.getUserByAccount(accountId, req);
	}
}

