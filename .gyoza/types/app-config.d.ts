declare module "app.config.ts" {
    const config: {
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
      }, {
        name: "@elysiajs/cors",
        config: {},
      }
    ],
  },
};
    export default config
}