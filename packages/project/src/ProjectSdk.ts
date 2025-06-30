import { Container } from "@webiny/di-container";
import { createProjectSdkContainer } from "./createProjectSdkContainer";
import {
    AfterBuildHook,
    AfterDeployHook,
    BeforeBuildHook,
    BeforeDeployHook,
    BuildAppCommand,
    DeployAppCommand,
    GetAppCommand,
    GetProjectCommand,
    GetProjectInfoCommand
} from "~/abstractions";

export type ProjectSdkOptions = Partial<{
    beforeBuildHooks: BeforeBuildHook.Interface[];
    afterBuildHooks: AfterBuildHook.Interface[];
    beforeDeployHooks: BeforeDeployHook.Interface[];
    afterDeployHooks: AfterDeployHook.Interface[];
}>;

export class ProjectSdk {
    cwd: string;
    container: Container;

    protected constructor(cwd: string, options: ProjectSdkOptions = {}) {
        this.cwd = cwd;

        this.container = createProjectSdkContainer(options);
    }

    // Project-related methods.
    getProject() {
        return this.container.resolve(GetProjectCommand).execute(this.cwd);
    }

    getProjectInfo() {
        return this.container.resolve(GetProjectInfoCommand).execute();
    }

    // App-related methods.
    async getApp(appName: string) {
        const project = await this.getProject();
        return this.container.resolve(GetAppCommand).execute({ project, appName });
    }

    buildApp(params: BuildAppCommand.Params) {
        return this.container.resolve(BuildAppCommand).execute(params);
    }

    deployApp(params: DeployAppCommand.Params) {
        return this.container.resolve(DeployAppCommand).execute(params);
    }

    static init(cwd: string, options?: ProjectSdkOptions) {
        return new ProjectSdk(cwd, options);
    }
}
