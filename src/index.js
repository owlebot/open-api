import { Requester, Server, TEMPLATE } from "@owlebot/lib";
import { Logger } from "@owlebot/logger";

import packageJson from "../package.json" assert { type: 'json' };
import example from "./import-example.json" assert { type: 'json' };
import { createCommunitiesRoute } from "./routes/communities.route.js";
import { createUsersRoute } from "./routes/users.route.js";

Logger.create(packageJson.name);

Logger.debug("test", "test example", example.test);

const server = new Server();
server.init();
server.addLogger(Logger);
server.addSwagger( { name: packageJson.name } );
server.addHealthEndpoint();

const requester = Requester.create("TEMPLATE", "IDENTIFICATION", Logger);

server.app.get("/", async(req, res) => {
	res.status(200).send("hello world");
} );

const router = server.addRouter();
router.use(TEMPLATE.USERS.router(), createUsersRoute(requester) );
router.use(TEMPLATE.COMMUNITIES.router(), createCommunitiesRoute(requester) );

server.start(process.env.API_PORT || 3000);
