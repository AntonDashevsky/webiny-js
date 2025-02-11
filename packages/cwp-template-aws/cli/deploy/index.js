export default () => ({
    type: "cli-command-deployment-deploy-all",
    name: "cli-command-deployment-deploy-all",
    deploy: async (...args) => {
        // eslint-disable-next-line import/dynamic-import-chunkname
        const deploy = await import("./deploy.js");
        return deploy(...args);
    }
});
