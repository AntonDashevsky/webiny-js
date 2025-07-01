import { Abstraction } from "@webiny/di-container";
import type { Pulumi, Options as PulumiOptions } from "@webiny/pulumi-sdk";
import { IAppModel } from "~/abstractions/models/index.js";

export type IPulumiLoginServiceParams = Partial<{
    app?: IAppModel;
    pulumiOptions: PulumiOptions;
}>;

export interface IPulumiLoginService {
    execute(app: IAppModel): Promise<Pulumi>;
}

export const PulumiLoginService = new Abstraction<IPulumiLoginService>("PulumiLoginService");

export namespace PulumiLoginService {
    export type Interface = IPulumiLoginService;
    export type Params = IPulumiLoginServiceParams;
}
