export default () => ({
    type: "cli-command-deployment-destroy-all",
    name: "cli-command-deployment-destroy-all",
    destroy: async (...args) => {
        // eslint-disable-next-line import/dynamic-import-chunkname
        const destroy = await import("./destroy");
        return destroy(...args);
    }
});
