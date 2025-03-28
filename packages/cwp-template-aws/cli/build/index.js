export default () => ({
    type: "cli-command-deployment-build-all",
    name: "cli-command-deployment-build-all",
    build: async (...args) => {
        // eslint-disable-next-line import/dynamic-import-chunkname
        const build = await import("./build.js");
        return build(...args);
    }
});
