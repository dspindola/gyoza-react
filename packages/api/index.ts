import { type Context } from "elysia";

// type Method = keyof Elysia

// type Handler = <K extends string>(api: Elysia) => (path: string, handler: Context) => Record<K, any>

export const APIHandler = <T extends Object>(callback: (ctx: Context) => T) => {
	return callback;
};
