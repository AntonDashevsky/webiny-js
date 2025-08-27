import { StdioService, UiService } from "~/abstractions/index.js";
import { PackagesBuilder } from "@webiny/project/features/BuildApp/PackagesBuilder/PackagesBuilder";

export interface IBaseBuildRunnerParams {
    packagesBuilder: PackagesBuilder;
    stdio: StdioService.Interface;
    ui: UiService.Interface;
}

export class BaseBuildRunner {
    public readonly packagesBuilder: PackagesBuilder;
    public readonly stdio: StdioService.Interface;
    public readonly ui: UiService.Interface;

    public constructor({ packagesBuilder, stdio, ui }: IBaseBuildRunnerParams) {
        this.packagesBuilder = packagesBuilder;
        this.stdio = stdio;
        this.ui = ui;
    }

    public async run(): Promise<void> {
        throw new Error("Not implemented.");
    }
}
