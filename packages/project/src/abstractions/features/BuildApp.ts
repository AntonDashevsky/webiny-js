import { Abstraction } from "@webiny/di-container";
import { IBaseAppParams } from "~/abstractions/types.js";
import { ChildProcess } from "child_process";

export interface IBuildProcess {
    packageName: string;
    process: ChildProcess;
}

export type IBuildResult = Promise<IBuildProcess[]>;

interface IBuildApp {
    execute(params: IBaseAppParams): IBuildResult;
}

export const BuildApp = new Abstraction<IBuildApp>("BuildApp");

export namespace BuildApp {
    export type Interface = IBuildApp;

    export type Params = IBaseAppParams;
    export type Result = IBuildResult;
}
