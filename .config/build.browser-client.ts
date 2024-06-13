const [command, ref] = import.meta.file.split(".");
const [target, entry] = ref.split("-") as
	| [`browser`, `client`]
	| [`bun`, `server`];

try {
	await Bun[command as "build"]({
		entrypoints: [`./app/entry.${entry}.tsx`],
		format: "esm",
		outdir: `dist/${entry}`,
		naming: "main.js",
		target: target,
		define: {
			"globalThis._hash_": new ShadowRealm().evaluate(Bun._hash_),
		},
	});
} catch (error) {
	console.error(error);
}
