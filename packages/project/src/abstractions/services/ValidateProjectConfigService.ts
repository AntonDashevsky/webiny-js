import { Abstraction } from "@webiny/di-container";
import { IProjectConfigModel } from "~/abstractions/models/index.js";

interface IValidateProjectConfigService {
    execute(projectConfig: IProjectConfigModel): Promise<void>;
}

export const ValidateProjectConfigService = new Abstraction<IValidateProjectConfigService>(
    "ValidateProjectConfigService"
);

export namespace ValidateProjectConfigService {
    export type Interface = IValidateProjectConfigService;
    export type Params = IProjectConfigModel;
}
