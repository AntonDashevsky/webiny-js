import { Abstraction } from "@webiny/di-container";
import { IAppModel } from "~/abstractions/models/IAppModel";

export interface IBuildParams {
    env: string;
    debug?: boolean;
    variant?: string;
    region?: string;
}

export interface IBuildAppService {
    execute(app: IAppModel, buildParams: IBuildParams): Promise<void>;
}

export const BuildAppService = new Abstraction<IBuildAppService>("BuildAppService");

export namespace BuildAppService {
    export type Interface = IBuildAppService;
    export type Params = IBuildParams;
}
