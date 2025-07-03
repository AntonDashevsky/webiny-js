import { Abstraction } from "@webiny/di-container";
import { IAppModel } from "~/abstractions/models/IAppModel.js";
import { IBaseAppParams } from "~/abstractions/types.js";

export interface IPulumiGetStackExportServiceParams extends Omit<IBaseAppParams, "app"> {}

export interface IPulumiGetStackExportService {
    execute<TOutput extends Record<string, any> = Record<string, any>>(
        app: IAppModel,
        params: IPulumiGetStackExportServiceParams
    ): Promise<TOutput | null>;
}

export const PulumiGetStackExportService = new Abstraction<IPulumiGetStackExportService>(
    "PulumiGetStackExportService"
);

export namespace PulumiGetStackExportService {
    export type Interface = IPulumiGetStackExportService;
    export type Params = IPulumiGetStackExportServiceParams;
}
