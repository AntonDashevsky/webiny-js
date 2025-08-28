import { IProjectModel } from "~/abstractions/models";

export interface ConfigRenderArgs {
    project: IProjectModel;
    args?: Record<string, any>;
}

export const getConfigRenderArgs = () => {
    return JSON.parse(process.argv[2]) as ConfigRenderArgs;
};
