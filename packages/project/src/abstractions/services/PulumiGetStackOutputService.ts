import { Abstraction } from "@webiny/di-container";
import { IAppModel } from "~/abstractions/models/IAppModel";
import { BaseBuildDeployParams } from "~/abstractions/types";

export interface IPulumiGetStackOutputParams extends BaseBuildDeployParams {
    map?: Record<string, any>
}

export interface IPulumiGetStackOutputService<TOutput = Record<string, any>> {
    execute(app: IAppModel, params: IPulumiGetStackOutputParams): Promise<TOutput | null>;
}

export const PulumiGetStackOutputService = new Abstraction<IPulumiGetStackOutputService>(
    "PulumiGetStackOutputService"
);

export namespace PulumiGetStackOutputService {
    export type Interface = IPulumiGetStackOutputService;
    export type Params = IPulumiGetStackOutputParams;
}
