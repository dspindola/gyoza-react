import { Elysia } from "elysia";
import { handler } from "@/app/entry.server";
import { default as Index } from "@/app/routes/api/index";
import { treaty } from "@elysiajs/eden";
import { swagger } from "@elysiajs/swagger";
import { staticPlugin } from "@elysiajs/static";
import { cors } from "@elysiajs/cors"

const isProd = process.env.NODE_ENV === "production";
const port = isProd ? 8080 : 3000;
const hostname = isProd ? "0.0.0.0" : "127.0.0.1";

export const Api = () =>
    new Elysia({
        prefix: "/api",
    })
        .use(swagger())
        .use(Index);

export type API = ReturnType<typeof Api>;

export const App = () => treaty<API>(hostname + ":" + port);

const publicAssets = () =>
    staticPlugin({
        assets: "public",
        noCache: true,
        alwaysStatic: false,
        directive: "public",
    });

const distMain = () => Bun.file("dist/client/main.js");

const favicon = () => Bun.file("public/favicon.ico");

const app = () =>
    new Elysia()
        .use(cors())
        .use(publicAssets())
        .use(Api())
        .get("/favicon.ico", favicon)
        .get("/_dist/main.js", distMain)
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
