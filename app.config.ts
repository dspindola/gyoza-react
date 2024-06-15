function defineConfig<T extends Object>(userConfig: T) {
    const UserConfigDeclaration = `declare module "app.config.ts" {
    const config: ${Bun.inspect(userConfig)};
    export default config
}`
    Bun.write('.gyoza/types/app-config.d.ts', UserConfigDeclaration)

    return userConfig
};

export default defineConfig({
    server: {
        plugins: [
            {
                name: "@elysiajs/static",
                config: {
                    assets: "public",
                    noCache: true,
                    alwaysStatic: false,
                    directive: "public",
                },
            },
            {
                name: "@elysiajs/cors",
                config: {}
            }
        ],
    },
})
