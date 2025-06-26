import { Container } from "@webiny/di-container";
import {
    GetProjectInfoCommand,
    BuildAppCommand,
    GetProjectCommand,
    GetAppCommand
} from "~/abstractions";
import {
    getProjectInfoCommand,
    buildAppCommand,
    getProjectCommand,
    getAppCommand
} from "./features";
import {
    getIsCiService,
    getNpmVersionService,
    getNpxVersionService,
    getPulumiVersionService,
    getYarnVersionService,
    projectInfoService,
    getProjectService,
    getAppService,
    getAppPackagesService,
    buildAppService,
    loggerService,

    // Hooks registries.
    afterBuildHooksRegistry,
    afterDeployHooksRegistry,
    beforeBuildHooksRegistry,
    beforeDeployHooksRegistry
} from "./services";

export class ProjectSdk {
    cwd: string;
    container: Container;

    protected constructor(cwd: string, options: any) {
        this.cwd = cwd;

        this.container = new Container();

        // Services.
        this.container.register(getIsCiService).inSingletonScope();
        this.container.register(getNpmVersionService).inSingletonScope();
        this.container.register(getNpxVersionService).inSingletonScope();
        this.container.register(getPulumiVersionService).inSingletonScope();
        this.container.register(getYarnVersionService).inSingletonScope();
        this.container.register(projectInfoService).inSingletonScope();
        this.container.register(getProjectService).inSingletonScope();
        this.container.register(getAppService).inSingletonScope();
        this.container.register(buildAppService).inSingletonScope();
        this.container.register(getAppPackagesService).inSingletonScope();
        this.container.register(loggerService).inSingletonScope();

        // Services - hooks.
        this.container.register(afterBuildHooksRegistry).inSingletonScope();
        this.container.register(afterDeployHooksRegistry).inSingletonScope();
        this.container.register(beforeBuildHooksRegistry).inSingletonScope();
        this.container.register(beforeDeployHooksRegistry).inSingletonScope();

        // Features.
        this.container.register(getProjectCommand).inSingletonScope();
        this.container.register(getAppCommand).inSingletonScope();
        this.container.register(buildAppCommand).inSingletonScope();
        this.container.register(getProjectInfoCommand).inSingletonScope();

        // Extra.
        if (options && Array.isArray(options.beforeBuildHooks)) {
            options.beforeBuildHooks.forEach((hook:any) => {
                this.container.register(hook).inSingletonScope();
            });
        }
    }

    getProject() {
        return this.container.resolve(GetProjectCommand).execute(this.cwd);
    }

    getProjectInfo() {
        return this.container.resolve(GetProjectInfoCommand).execute();
    }

    buildApp(params: BuildAppCommand.Params) {
        return this.container.resolve(BuildAppCommand).execute(params);
    }

    async getApp(appName: string) {
        const project = await this.getProject();
        return this.container.resolve(GetAppCommand).execute({ project, appName });
    }

    static init(cwd: string, options: any) {
        return new ProjectSdk(cwd, options);
    }
}
