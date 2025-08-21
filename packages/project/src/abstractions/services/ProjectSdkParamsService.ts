import { Abstraction } from "@webiny/di-container";
import { ExtensionDefinitionModel } from "~/extensions/models/ExtensionDefinitionModel.js";

export interface IProjectSdkParams {
    cwd: string;
    extensions: ExtensionDefinitionModel<any>[];
}

export interface IProjectSdkParamsService {
    get(): IProjectSdkParams;
    set(params: Partial<IProjectSdkParams>): void;
}

export const ProjectSdkParamsService = new Abstraction<IProjectSdkParamsService>(
    "ProjectSdkParamsService"
);

export namespace ProjectSdkParamsService {
    export type Interface = IProjectSdkParamsService;
    export type Params = IProjectSdkParams;
}
