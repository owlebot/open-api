const fs = require("node:fs");
const path  = require("node:path");

const dotenv = require("dotenv");

const pkg = require("../package.json");

console.log("Loading environment...")

// not enough args provided, don't start the app
if (process.argv.length < 7) {
	console.error("ERROR: Not enough arguments. Specify platform and environment: pm2 startOrRestart ./pm2/ecosystem.config.js --env default production");
	return null;
}

const MAP_ENV = {
	main: "production",
	prod: "production",
	production: "production",
	staging: "staging",
	development: "local",
	dev: "local",
	local: "local",
}

const APP_PLATFORM =process.argv[5]
const APP_ENV = MAP_ENV[process.argv[6]]

// Invalid environemnt
if (!APP_ENV) {
	console.error("ERROR: Invalid environment (production, staging, development)!");
	return null;
}
const CWD = __dirname;
const CWD_ROOT = path.join(CWD, "..");
console.log("ROOT: ", CWD_ROOT);

// Load globals (endpoints)
console.log("Loading globals...");
const pathToMain = path.join(CWD_ROOT, "../../main/");
dotenv.config( { path: path.join(pathToMain, `env/.env.${APP_ENV}`) } );

// Load locals default
console.log("Loading local defaults...");
const defaultEnv = path.join(CWD_ROOT, "./.env.defaults");
fs.existsSync(defaultEnv) && dotenv.config( { path: defaultEnv } );

// Load locals override
console.log("Loading locals...");
const localEnv = path.join(CWD_ROOT, "./.env");
fs.existsSync(localEnv) && dotenv.config( { path: localEnv, override: true } );

module.exports = {
	apps: [
		{
			name: `${APP_ENV}/${pkg.name.replace("@owlebot/", "")}[${APP_PLATFORM}]`,
			script: pkg.main,
			env_default: {},
			env_twitch: {
				PLATFORM: "twitch",
			},
			env_discord: {
				PLATFORM: "discord",
			},
		},
	],
};
