import type { Elysia } from "elysia";

export default <T extends Elysia>(api: T) =>
	api
		.get("/", () => Bun.file("bunfig.toml").text())
		.post("/", ({ body }) => body);
