declare module "*.css" {
	const content: URL & { as: "style" };
	export default content;
}

declare global {
	interface Window {
		readonly document: {
			_hash_: string;
		};
	}
}
