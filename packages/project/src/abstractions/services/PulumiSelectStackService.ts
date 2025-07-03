import { Abstraction } from "@webiny/di-container";
import { IAppModel } from "~/abstractions/models/IAppModel.js";
import { IBaseAppParams } from "~/abstractions/types.js";

export interface IDeployParams extends IBaseAppParams {}

export interface IPulumiSelectStackService {
    execute(app: IAppModel, params: Omit<IDeployParams, 'app'>): Promise<void>;
}

export const PulumiSelectStackService = new Abstraction<IPulumiSelectStackService>(
    "PulumiSelectStackService"
);

export namespace PulumiSelectStackService {
    export type Interface = IPulumiSelectStackService;
    export type Params = IDeployParams;
}
