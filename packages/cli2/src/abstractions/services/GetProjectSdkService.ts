import { Abstraction } from "@webiny/di-container";
import { ProjectSdk } from "@webiny/project";

export interface IGetProjectSdkService {
    execute(cwd?: string): ProjectSdk;
}

export const GetProjectSdkService = new Abstraction<IGetProjectSdkService>("GetProjectSdkService");

export namespace GetProjectSdkService {
    export type Interface = IGetProjectSdkService;
}
