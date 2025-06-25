import { Abstraction } from "@webiny/di-container";
import { IAppModel, IAppPackageModel } from "~/abstractions/models";

export interface IGetAppPackagesService {
    execute(app: IAppModel): Promise<IAppPackageModel[]>;
}

export const GetAppPackagesService = new Abstraction<IGetAppPackagesService>(
    "GetAppPackagesService"
);

export namespace GetAppPackagesService {
    export type Interface = IGetAppPackagesService;
}
