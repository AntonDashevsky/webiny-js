import { Abstraction } from "@webiny/di-container";
import { IBaseAppParams } from "~/abstractions/types.js";
import { ExecaChildProcess } from "execa";

type IPulumiProcess = ExecaChildProcess<string>;

interface IDestroyAppParams extends IBaseAppParams {
    debug?: boolean;

    onPulumiProcess?: (process: IPulumiProcess) => void;
}

interface IDestroyApp {
    execute(params: IDestroyAppParams): Promise<void>;
}

export const DestroyApp = new Abstraction<IDestroyApp>("DestroyApp");

export namespace DestroyApp {
    export type Interface = IDestroyApp;

    export type Params = IDestroyAppParams;

    export type PulumiProcess = IPulumiProcess;
}
