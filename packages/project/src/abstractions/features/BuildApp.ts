import { Abstraction } from "@webiny/di-container";
import { IBaseAppParams } from "~/abstractions/types.js";
import { RunnableBuildProcessCollection } from "~/features/BuildApp/builders/RunnableBuildProcessCollection.js";

export type IBuildAppParams = IBaseAppParams;

export type IBuildResult = RunnableBuildProcessCollection;

interface IBuildApp {
    execute(params: IBuildAppParams): Promise<IBuildResult>;
}

export const BuildApp = new Abstraction<IBuildApp>("BuildApp");

export namespace BuildApp {
    export type Interface = IBuildApp;

    export type Params = IBuildAppParams;
    export type Result = IBuildResult;
}
