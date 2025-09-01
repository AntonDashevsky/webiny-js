import { createBuildFunction, createWatchFunction } from "@webiny/project-utils";

export default {
    commands: {
        build: createBuildFunction({ cwd: import.meta.__dirname }),
        watch: createWatchFunction({ cwd: import.meta.__dirname })
    }
};
