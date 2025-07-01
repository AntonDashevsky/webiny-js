import { Abstraction } from "@webiny/di-container";
import { IBaseAppParams } from "~/abstractions/types.js";
import { ExecaChildProcess } from "execa";

type IPulumiProcess = ExecaChildProcess<string>;

interface IRunPulumiCommandParams extends IBaseAppParams {
    command: string[],
    onPulumiProcess?: (process: IPulumiProcess) => void;
}

interface IRunPulumiCommand {
    execute(params: IRunPulumiCommandParams): Promise<void>;
}

export const RunPulumiCommand = new Abstraction<IRunPulumiCommand>("RunPulumiCommand");

export namespace RunPulumiCommand {
    export type Interface = IRunPulumiCommand;

    export type Params = IRunPulumiCommandParams;

    export type PulumiProcess = IPulumiProcess;
}
