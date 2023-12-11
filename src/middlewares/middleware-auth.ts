import { Logger } from "@owlebot/logger";
import { verifyKey } from "@unkey/api";
import { Request as ExpressRequest } from "express";

interface UnkeyAuth {
	keyId?: string;
	valid: boolean;
	name?: string;
	ownerId?: string;
	meta?: {
		[key: string]: unknown;
	}
}

const ACCESS_TOKEN = "X-Access-Token";

function notAuthenticated() {
	Logger.warn("Auth", "Not authenticated");
	throw new Error("Not Authenticated");
}

function authenticated(auth: UnkeyAuth) {
	Logger.info("Auth", "Authenticated");
	return {
		id: auth.ownerId,
	};
}

// Cache
const cache: Map<string, UnkeyAuth> = new Map();

// Middleware authentication
export async function expressAuthentication(
	request: ExpressRequest,
	securityName: string,
	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	scopes?: string[]
): Promise<unknown> {
	if (securityName === "api_key") {
		const token = request.get(ACCESS_TOKEN);
		if (!token) {
			return notAuthenticated();
		}
   
		const cachedResult = cache.get(token);

		if (cachedResult) {
			return authenticated(cachedResult);
		}
		const { result, error } = await verifyKey(token);
      
		if (error || !result.valid) {
			return notAuthenticated();
		}
      
		cache.set(token, result);
		return authenticated(result);
	}
	return notAuthenticated();
}
