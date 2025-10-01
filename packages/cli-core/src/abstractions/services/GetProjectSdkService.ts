import { Abstraction } from "@webiny/di-container";
import { type ProjectSdk } from "@webiny/project";

export interface IGetProjectSdkService {
    execute(): Promise<ProjectSdk>;
}

export const GetProjectSdkService = new Abstraction<IGetProjectSdkService>("GetProjectSdkService");

export namespace GetProjectSdkService {
    export type Interface = IGetProjectSdkService;
}
