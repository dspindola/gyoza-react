import type { Context, RouteBase, SingletonBase } from "elysia";
import { renderToReadableStream } from "react-dom/server";
import { createRouter } from "./router";

export async function loadSource(filePath: string) {
	return await import(filePath!).then((module) => module.default);
}

export async function handler<T extends string>(
	ctx: Context<RouteBase, SingletonBase, T>,
) {
	try {
		const controller = new AbortController();
		const router = createRouter();
		const route = router.match(ctx.path);

		const Context = {
			app: await loadSource("./main"),
			page: await loadSource(route?.filePath!),
		};

		const stream = await renderToReadableStream(
			<Context.app>
				<Context.page />
			</Context.app>,
			{
				bootstrapModules: ["/_dist/main.js"],
				bootstrapScripts: ["https://cdn.tailwindcss.com"],
				onError(error, errorInfo) {
					console.log(error, errorInfo);
					controller.abort();
				},
				signal: controller.signal,
			},
		);
		return new Response(stream, {
			headers: {
				"Conten-Type": "text/html; charset=utf-8",
			},
		});
	} catch (error) {
		return new Response("Not found", {
			status: 404,
		});
	}
}
