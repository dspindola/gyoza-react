import "./build.browser-client";
import "./build.bun-server";

declare module "bun" {
	export const _hash_: string;
}
