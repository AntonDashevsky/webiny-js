import { Abstraction } from "@webiny/di-container";
import { IAppModel } from "~/abstractions/models/IAppModel";
import { BaseBuildDeployParams } from "~/abstractions/types";

export interface IDeployParams extends BaseBuildDeployParams {
}

export interface IPulumiSelectStackService {
    execute(app: IAppModel, params: IDeployParams): Promise<void>;
}

export const PulumiSelectStackService = new Abstraction<IPulumiSelectStackService>("PulumiSelectStackService");

export namespace PulumiSelectStackService {
    export type Interface = IPulumiSelectStackService;
    export type Params = IDeployParams;
}
