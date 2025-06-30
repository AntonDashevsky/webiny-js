import { Container } from "@webiny/di-container";
import { createProjectSdkContainer } from "./createProjectSdkContainer";
import {
    AfterBuildHook,
    AfterDeployHook,
    BeforeBuildHook,
    BeforeDeployHook,
    BuildApp,
    DeployApp,
    GetApp,
    GetProject,
    GetProjectInfo
} from "~/abstractions";

export class ProjectSdk {
    cwd: string;
    container: Container;

    protected constructor(cwd: string) {
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
        const project = await this.getProject();
        return this.container.resolve(GetApp).execute({ project, appName });
    }

    buildApp(params: BuildApp.Params) {
        return this.container.resolve(BuildApp).execute(params);
    }

    deployApp(params: DeployApp.Params) {
        return this.container.resolve(DeployApp).execute(params);
    }

    getContainer() {
        return this.container;
    }

    static init(cwd: string) {
        return new ProjectSdk(cwd);
    }
}
