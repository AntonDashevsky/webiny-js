import { Container } from "@webiny/di-container";
import { createProjectSdkContainer } from "./createProjectSdkContainer.js";
import {
    BuildApp,
    DeployApp,
    DestroyApp,
    GetApp,
    GetAppOutput,
    GetProject,
    GetProjectInfo,
    RefreshApp,
    RunPulumiCommand,
    Watch
} from "~/abstractions/index.js";

export class ProjectSdk {
    cwd?: string;
    container: Container;

    protected constructor(cwd?: string) {
        this.cwd = cwd;
        this.container = createProjectSdkContainer();
    }

    // Project-related methods.
    getProject() {
        return this.container.resolve(GetProject).execute(this.cwd);
    }

    getProjectInfo() {
        return this.container.resolve(GetProjectInfo).execute();
    }

    // App-related methods.
    async getApp(appName: string) {
        return this.container.resolve(GetApp).execute(appName);
    }

    async getAppOutput(params: GetAppOutput.Params) {
        return this.container.resolve(GetAppOutput).execute(params);
    }

    buildApp(params: BuildApp.Params) {
        return this.container.resolve(BuildApp).execute(params);
    }

    deployApp(params: DeployApp.Params) {
        return this.container.resolve(DeployApp).execute(params);
    }

    destroyApp(params: DestroyApp.Params) {
        return this.container.resolve(DestroyApp).execute(params);
    }

    refreshApp(params: RefreshApp.Params) {
        return this.container.resolve(RefreshApp).execute(params);
    }

    runPulumiCommand(params: RunPulumiCommand.Params) {
        return this.container.resolve(RunPulumiCommand).execute(params);
    }

    watch(params: Watch.Params) {
        return this.container.resolve(Watch).execute(params);
    }

    getContainer() {
        return this.container;
    }

    static init(cwd?: string) {
        return new ProjectSdk(cwd);
    }
}
