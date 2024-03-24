import { IDENTIFICATION, PROFILE } from "@owlebot/lib/endpoints";
import { Request } from "tsoa";

import { Community } from "../dto/output/community.dto.js";
import { User } from "../dto/output/user.dto.js";
import { identificationRequester, profileRequester } from "../index.js";

export class UsersService {
	#identification = identificationRequester;

	#profile = profileRequester;
	
	public async getUserByAccount(id: string, context: Request): Promise<User | null> {
		const user = await this.#identification.get(IDENTIFICATION.ACCOUNTS._.IDENTIFY.resolve(id), context);
		
		if (!user || !user.ok || !user.data) {
			return null;
		}

		const communities = await this.#identification.get(IDENTIFICATION.USERS._.OWN_COMMUNITIES.resolve(user.data.id), context);

		if (!communities || !communities.ok || !communities.data) {
			return null;
		}

		for (const community of communities.data) {
			const members = await this.#profile.get(PROFILE.COMMUNITIES._.MEMBERS.resolve(community.id), context);
			
			if (members.ok && members.data) {
				// remove total number because we only want platform members
				delete members.data.total;
				
				const platformMembers = Object.values(members.data);
				community.members = Math.max(...platformMembers as number[] );
			}
		}

		return {
			id: user.data.id,
			communities: communities.data.filter( (e: Community) => !e.private).map( (e: Community) => {
				return {
					id: e.id,
					ownerId: e.ownerId,
					premium: e.premium,
					name: e.name,
					description: e.description,
					longDescription: e.longDescription,
					image: e.image,
					members: e.members,
				};
			} ),
		};
	}
}
