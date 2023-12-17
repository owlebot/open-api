import { Requester } from "@owlebot/lib/requester";
import { Server } from "@owlebot/lib/server";
import { Logger } from "@owlebot/logger";

import { RegisterRoutes } from "../build/routes.js";
import packageJson from "../package.json" assert { type: "json" };
import openapiSpecs from "../specs/openapi.json" assert { type: "json" };

Logger.create(packageJson.name);

const server = new Server();
server.init(process.env.OPEN_API_PORT);
server.addLogger(Logger);
server.addHealthEndpoint();

await server.addSwagger( {
	enableProd: true,
	urlProd: "https://api.owle.bot/v1",
	definition: openapiSpecs,
	meta: { name: packageJson.name },
} );

RegisterRoutes(server.app);

export const identificationRequester = Requester.create("OPEN_API", "IDENTIFICATION", Logger);
export const profileRequester = Requester.create("OPEN_API", "PROFILE", Logger);

server.start();
