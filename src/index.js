import { Server } from "@owlebot/lib";
import { Logger } from "@owlebot/logger";

import packageJson from "../package.json" assert { type: 'json' };
import { createRoute } from "./routes/route.route.js";

Logger.create(packageJson.name);

const server = new Server();
server.init();
server.addLogger(Logger);
server.addSwagger( { name: packageJson.name } );
server.addHealthEndpoint();


const router = server.addRouter();
router.use("/", createRoute() );

server.start(process.env.OPEN_API_PORT || 3000);
