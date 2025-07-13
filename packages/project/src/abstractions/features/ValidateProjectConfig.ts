import { Abstraction } from "@webiny/di-container";
import { IProjectConfigModel } from "~/abstractions/models/index.js";

interface IValidateProjectConfig {
    execute(params: IProjectConfigModel): Promise<void>;
}

export const ValidateProjectConfig = new Abstraction<IValidateProjectConfig>("ValidateProjectConfig");

export namespace ValidateProjectConfig {
    export type Interface = IValidateProjectConfig;
    export type Params = IProjectConfigModel;
}
