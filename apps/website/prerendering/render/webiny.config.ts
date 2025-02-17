import { createBuildFunction, createWatchFunction } from "@webiny/project-utils";

const webpack = config => {
    (config.externals as any).push("@sparticuz/chromium");
    return config;
};

export default {
    commands: {
        build: createBuildFunction({ cwd: import.meta.dirname, overrides: { webpack } }),
        watch: createWatchFunction({ cwd: import.meta.dirname, overrides: { webpack } })
    }
};
