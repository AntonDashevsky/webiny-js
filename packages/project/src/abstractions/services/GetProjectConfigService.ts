import { Abstraction } from "@webiny/di-container";
import { IProjectConfigModel } from "~/abstractions/models/index.js";

interface IGetProjectConfigService {
    execute(): Promise<IProjectConfigModel>;
}

export const GetProjectConfigService = new Abstraction<IGetProjectConfigService>(
    "GetProjectConfigService"
);

export namespace GetProjectConfigService {
    export type Interface = IGetProjectConfigService;
}
