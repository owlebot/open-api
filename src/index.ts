import { Server } from "@owlebot/lib/server";
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
server.init(process.env.OPEN_API_PORT);
server.addLogger(Logger);
// server.addHealthEndpoint();


const router = server.addRouter();

RegisterRoutes(server.app)

server.app.use("/api/v1", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(swaggerApi)
  );
});

server.start();
