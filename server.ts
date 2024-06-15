import { Elysia } from "elysia";
import { handler } from "@/app/entry.server";
import * as index from "@/app/routes/api/index";
import { treaty } from "@elysiajs/eden";
import { swagger } from "@elysiajs/swagger";
import { staticPlugin } from "@elysiajs/static";
import { cors } from "@elysiajs/cors";
import appConfig from "./app.config";

const staticPluginConfig = appConfig.server.plugins.find(({ name }) => name === "@elysiajs/static") as Object

const isProd = process.env.NODE_ENV === "production";
const port = isProd ? 8080 : 3000;
const hostname = isProd ? "0.0.0.0" : "127.0.0.1";

export const Api = () =>
	new Elysia({
		prefix: "/api",
	})
		.use(swagger())
		.get("/", index.GET)
		.post("/", index.POST)
		.delete("/", index.DELETE);

export type API = ReturnType<typeof Api>;

export const App = () => treaty<API>(hostname + ":" + port);

const publicAssets = () =>
	staticPlugin(staticPluginConfig);

const dist = (path: string) =>
	new Elysia().get(path, () => Bun.file("dist/client/main.js"));

const favicon = Bun.file("public/favicon.ico");

const app = () =>
	new Elysia()
		.use(cors())
		.use(publicAssets())
		.use(Api())
		.get("/favicon.ico", favicon)
		.use(dist("/_dist/main.js"))
		.all("*", handler)
		.listen(
			{
				hostname: hostname,
				port: port,
			},
			(server) => {
				console.log("%s", server.url);
			},
		);

if (process.isBun) {
	app();
}
