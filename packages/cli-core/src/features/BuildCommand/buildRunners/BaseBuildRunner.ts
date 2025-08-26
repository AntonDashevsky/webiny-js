import { StdioService, UiService } from "~/abstractions/index.js";
import { RunnableBuildProcessCollection } from "@webiny/project/features/BuildApp/builders/RunnableBuildProcessCollection";

export interface IBaseBuildRunnerParams {
    buildProcesses: RunnableBuildProcessCollection;
    stdio: StdioService.Interface;
    ui: UiService.Interface;
}

export class BaseBuildRunner {
    public readonly runnableBuildProcessCollection: RunnableBuildProcessCollection;
    public readonly stdio: StdioService.Interface;
    public readonly ui: UiService.Interface;

    public constructor({ buildProcesses, stdio, ui }: IBaseBuildRunnerParams) {
        this.runnableBuildProcessCollection = buildProcesses;
        this.stdio = stdio;
        this.ui = ui;
    }

    public async run(): Promise<void> {
        throw new Error("Not implemented.");
    }
}
