import { UiService, StdioService } from "~/abstractions";
import { ChildProcess } from "child_process";

export interface IBuildProcess {
    packageName: string;
    process: ChildProcess;
}

export interface IBaseBuildOutputParams {
    buildProcesses: IBuildProcess[];
    stdio: StdioService.Interface;
    ui: UiService.Interface;
}

export class BaseBuildOutput {
    public readonly buildProcesses: IBuildProcess[];
    public readonly stdio: StdioService.Interface;
    public readonly ui: UiService.Interface;

    public constructor({ buildProcesses, stdio, ui }: IBaseBuildOutputParams) {
        this.buildProcesses = buildProcesses;
        this.stdio = stdio;
        this.ui = ui;
    }

    public output(): void {
        throw new Error("Not implemented.");
    }
}
