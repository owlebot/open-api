import { Server } from "@owlebot/lib";
import { Logger } from "@owlebot/logger";

import express, { Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi from "swagger-ui-express";

// ...

import packageJson from "../package.json" assert { type: 'json' };
import swaggerApi from "../spec/tsoa/swagger.json" assert { type: 'json' };

import { RegisterRoutes } from "../build/routes.js";

// Logger.create(packageJson.name);
Logger.create("open-api");

const server = new Server();
server.init();
server.addLogger(Logger);
// server.addHealthEndpoint();


const router = server.addRouter();

RegisterRoutes(server.app)

server.app.use("/api/v1", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(swaggerApi)
  );
});

server.start(process.env.OPEN_API_PORT || 3000);
