export function createRouter() {
	return new Bun.FileSystemRouter({
		dir: "app/routes",
		style: "nextjs",
		fileExtensions: [".tsx"],
	});
}
