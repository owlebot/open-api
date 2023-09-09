import { Server } from "@owlebot/lib";
import { Logger } from "@owlebot/logger";

// import packageJson from "../package.json" assert { type: 'json' };
import { RegisterRoutes } from "../build/routes.js";

// Logger.create(packageJson.name);
Logger.create("open-api");

const server = new Server();
server.init();
server.addLogger(Logger);
// server.addHealthEndpoint();


const router = server.addRouter();

RegisterRoutes(server.app)

server.start(process.env.OPEN_API_PORT || 3000);