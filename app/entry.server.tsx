import { renderToReadableStream } from "react-dom/server";
import App from "@/app/main";
import type { Context, RouteBase, SingletonBase } from "elysia";
import "temporal-polyfill/global";

export async function handler<T extends string>(
	ctx: Context<RouteBase, SingletonBase, T>,
) {
	const controller = new AbortController();
	const router = new Bun.FileSystemRouter({
		dir: "app/routes",
		style: "nextjs",
		fileExtensions: [".tsx"],
	});
	const componentPath =
		router.match(ctx.path)?.filePath ??
		(() => {
			controller.abort();
			throw new Error("not found");
		})();

	const Component = await import(componentPath).then((m) => m.default);

	const stream = await renderToReadableStream(
		<App>
			<Component />
		</App>,
		{
			bootstrapModules: ["/_dist/main.js"],
            "identifierPrefix": "elysia-nextjs-",
            "bootstrapScripts": ['https://cdn.tailwindcss.com/3.4.4'],
			onError(error, errorInfo) {
				console.log(error, errorInfo);
				controller.abort();
			},
			signal: controller.signal,
			bootstrapScriptContent: `
        `,
		},
	);
	return new Response(stream, {
		headers: {
			"Conten-Type": "text/html; charset=utf-8",
		},
	});
}
