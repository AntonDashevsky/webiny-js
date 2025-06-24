import { Abstraction } from "@webiny/di-container";
import { IAppModel, IProjectModel } from "~/abstractions/models";

export interface IGetAppService {
    execute(project: IProjectModel, appName: string): IAppModel;
}

export const GetAppService = new Abstraction<IGetAppService>("GetAppService");

export namespace GetAppService {
    export type Interface = IGetAppService;
}
