import { Abstraction } from "@webiny/di-container";
import { IBaseAppParams } from "~/abstractions/types.js";
import { ChildProcess } from "child_process";

export interface IBuildProcess {
    packageName: string;
    process: ChildProcess;
}

export interface IBuildAppParams extends IBaseAppParams {
    output?: (buildProcesses: IBuildProcess[]) => Promise<void>;
}
export type IBuildResult = Promise<void>;

interface IBuildApp {
    execute(params: IBuildAppParams): IBuildResult;
}

export const BuildApp = new Abstraction<IBuildApp>("BuildApp");

export namespace BuildApp {
    export type Interface = IBuildApp;

    export type Params = IBuildAppParams;
    export type Result = IBuildResult;
}
