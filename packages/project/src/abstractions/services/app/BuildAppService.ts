import { Abstraction } from "@webiny/di-container";
import { IAppModel } from "~/abstractions/models/IAppModel";

export interface IBuildParams {
    env: string;
}

export interface IBuildAppService {
    execute(app: IAppModel, buildParams: IBuildParams): Promise<void>;
}

export const BuildAppService = new Abstraction<IBuildAppService>("BuildAppService");

export namespace BuildAppService {
    export type Interface = IBuildAppService;
}
