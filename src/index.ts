import { Server } from "@owlebot/lib/server";
import { Logger } from "@owlebot/logger";

import express, { Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi from "swagger-ui-express";
import NodeCache from 'node-cache';
import { verifyKey } from '@unkey/api';

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

// Cache
const cache = new NodeCache({ stdTTL: 10800 }); // Cache for 3 hours 

// Error class rapidos
class InternalServerError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 500;
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

//Middleware authentication
export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  console.log("IN AUTH")
  if (securityName === "api_key") {
    console.log("Check Key")
    const token = request.get("X-Access-Token") 
    if (!token) {
      return Promise.reject({});
    }
    console.log("token = " + token)
    const cachedResult = cache.get(token);

    if (cachedResult) {
      console.log("cached=",cachedResult)
      return Promise.resolve({
        id: 1,
      });
    } else {
      const { result, error } = await verifyKey(token);
      console.log("verify=",result)
      if (error) {
        const error = new InternalServerError('Internal Server Error');
        return Promise.reject(error)
      } else if (!result.valid){
        return Promise.reject({});
      } else {
        cache.set(token, result);
        return Promise.resolve({
          id: 1,
        });
      }
    }
  } else {
    return Promise.reject({});
  }
}

const router = server.addRouter();

RegisterRoutes(server.app)

server.app.use("/api/v1", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(swaggerApi)
  );
});

server.start();
