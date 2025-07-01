import { Abstraction } from "@webiny/di-container";
import { IAppModel } from "~/abstractions/models/IAppModel.js";
import { IBaseAppParams } from "~/abstractions/types.js";

export interface IPulumiGetStackOutputParams extends IBaseAppParams {
    map?: Record<string, any>;
}

export interface IPulumiGetStackOutputService {
    execute<TOutput extends Record<string, any> = Record<string, any>>(
        app: IAppModel,
        params: IPulumiGetStackOutputParams
    ): Promise<TOutput | null>;
}

export const PulumiGetStackOutputService = new Abstraction<IPulumiGetStackOutputService>(
    "PulumiGetStackOutputService"
);

export namespace PulumiGetStackOutputService {
    export type Interface = IPulumiGetStackOutputService;
    export type Params = IPulumiGetStackOutputParams;
}
