import { Abstraction } from "@webiny/di-container";
import { ExtensionDefinitionClass } from "~/createExtension";

export interface IProjectSdkParams {
    cwd?: string;
    extensions?: ExtensionDefinitionClass[];
}

export interface IProjectSdkParamsService {
    get(): IProjectSdkParams;
    set(params: IProjectSdkParams): void;
}

export const ProjectSdkParamsService = new Abstraction<IProjectSdkParamsService>(
    "ProjectSdkParamsService"
);

export namespace ProjectSdkParamsService {
    export type Interface = IProjectSdkParamsService;
    export type Params = IProjectSdkParams;
}
