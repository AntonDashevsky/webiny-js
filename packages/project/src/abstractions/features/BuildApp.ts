import { Abstraction } from "@webiny/di-container";
import { IBaseAppParams } from "~/abstractions/types.js";
import { ChildProcess, ForkOptions } from "child_process";
import { ListPackagesInAppWorkspaceService } from "~/abstractions";

export interface IBuildProcess {
    packageName: string;
    process: ChildProcess;
}

export type IBuildAppParams = IBaseAppParams;

export interface IBuildAppOptions {
    output?: (buildProcesses: IBuildProcess[]) => Promise<void>;
    buildProcessOptions?: (
        options: ForkOptions,
        extraData: {
            packages: ListPackagesInAppWorkspaceService.Result;
        }
    ) => ForkOptions;
}

export type IBuildResult = Promise<void>;

interface IBuildApp {
    execute(params: IBuildAppParams, options: IBuildAppOptions): IBuildResult;
}

export const BuildApp = new Abstraction<IBuildApp>("BuildApp");

export namespace BuildApp {
    export type Interface = IBuildApp;

    export type Params = IBuildAppParams;
    export type Options = IBuildAppOptions;
    export type Result = IBuildResult;
}
