import { Abstraction } from "@webiny/di-container";
import { IProjectConfigModel } from "~/abstractions/models/index.js";

interface IGetProjectConfigService {
    execute<TConfig extends Record<string, any> = Record<string, any>>(): Promise<IProjectConfigModel<TConfig>>;
}

export const GetProjectConfigService = new Abstraction<IGetProjectConfigService>("GetProjectConfigService");

export namespace GetProjectConfigService {
    export type Interface = IGetProjectConfigService;
}
