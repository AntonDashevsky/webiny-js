import { Container } from "@webiny/di-container";
import {
    GetProjectInfoCommand,
    BuildAppCommand,
    GetProjectCommand,
    GetAppCommand,
} from "~/abstractions";
import { getProjectInfoCommand, buildAppCommand, getProjectCommand, getAppCommand } from "./features";
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
    loggerService
} from "./services";

export class Project {
    cwd: string;
    container: Container;

    protected constructor(cwd?: string) {
        this.cwd = cwd || process.cwd();

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

        // Commands.
        this.container.register(getProjectCommand).inSingletonScope();
        this.container.register(getAppCommand).inSingletonScope();
        this.container.register(buildAppCommand).inSingletonScope();
        this.container.register(getProjectInfoCommand).inSingletonScope();
    }

    buildApp(params: BuildAppCommand.Params) {
        return this.container.resolve(BuildAppCommand).execute(params);
    }

    getProject() {
        return this.container.resolve(GetProjectCommand).execute(this.cwd);
    }

    async getApp(appName: string) {
        const project = await this.getProject();
        return this.container.resolve(GetAppCommand).execute({ project, appName });
    }

    getProjectInfo() {
        return this.container.resolve(GetProjectInfoCommand).execute();
    }

    static init(cwd?: string) {
        return new Project(cwd);
    }
}
