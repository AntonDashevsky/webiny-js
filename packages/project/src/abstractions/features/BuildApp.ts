import { Abstraction } from "@webiny/di-container";
import { type IBaseAppParams } from "~/abstractions/types.js";
import { type IPackagesBuilder } from "~/abstractions/models/index.js";

export type IBuildAppParams = IBaseAppParams;

export type IBuildResult = IPackagesBuilder;

interface IBuildApp {
    execute(params: IBuildAppParams): Promise<IBuildResult>;
}

export const BuildApp = new Abstraction<IBuildApp>("BuildApp");

export namespace BuildApp {
    export type Interface = IBuildApp;

    export type Params = IBuildAppParams;
    export type Result = IBuildResult;
}
