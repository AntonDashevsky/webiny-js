import { Abstraction } from "@webiny/di-container";
import { IBaseAppParams } from "~/abstractions/types";
import { ExecaChildProcess } from "execa";

type IPulumiProcess = ExecaChildProcess<string>;

interface IRefreshAppParams extends IBaseAppParams {
    onPulumiProcess?: (process: IPulumiProcess) => void;
}

interface IRefreshApp {
    execute(params: IRefreshAppParams): Promise<void>;
}

export const RefreshApp = new Abstraction<IRefreshApp>("RefreshApp");

export namespace RefreshApp {
    export type Interface = IRefreshApp;

    export type Params = IRefreshAppParams;

    export type PulumiProcess = IPulumiProcess;
}
