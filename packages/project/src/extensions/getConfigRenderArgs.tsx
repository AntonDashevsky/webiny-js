import { type IProjectModel } from "~/abstractions/models/index.js";

export interface ConfigRenderArgs {
    project: IProjectModel;
    args?: Record<string, any>;
}

export const getConfigRenderArgs = () => {
    return JSON.parse(process.argv[2]) as ConfigRenderArgs;
};
