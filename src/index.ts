import { Requester } from "@owlebot/lib/requester";
import { Server } from "@owlebot/lib/server";
import { Logger } from "@owlebot/logger";
import { Request as ExRequest, Response as ExResponse } from "express";
import swaggerUi from "swagger-ui-express";

import { RegisterRoutes } from "../build/routes.js";
import packageJson from "../package.json" assert { type: "json" };
import swaggerApi from "../specs/openapi.json" assert { type: "json" };

Logger.create(packageJson.name);

const server = new Server();
server.init(process.env.OPEN_API_PORT);
server.addLogger(Logger);
server.addHealthEndpoint();

RegisterRoutes(server.app);

export const identificationRequester = Requester.create("OPEN_API", "IDENTIFICATION", Logger);
export const profileRequester = Requester.create("OPEN_API", "PROFILE", Logger);

server.app.use("/api/v1", swaggerUi.serve, async(_req: ExRequest, res: ExResponse) => res.send(
	swaggerUi.generateHTML(swaggerApi)
) );

server.start();
