import { Container } from "@webiny/di-container";
import { createProjectSdkContainer } from "./createProjectSdkContainer.js";
import {
    BuildApp,
    DeployApp,
    DestroyApp,
    GetApp,
    GetAppOutput,
    GetAppStackExport,
    GetAppStackOutput,
    LoggerService,
    GetProject,
    GetProjectConfig,
    GetProjectInfo,
    IsCi,
    IsTelemetryEnabled,
    ProjectSdkParamsService,
    RefreshApp,
    RunPulumiCommand,
    ValidateProjectConfig,
    Watch
} from "~/abstractions/index.js";
import { isValidRegionName, isValidVariantName } from "./utils/index.js";

let cachedProjectSdk: ProjectSdk | null = null;

export class ProjectSdk {
    container: Container;

    protected constructor(container: Container) {
        this.container = container;
    }

    static async init(params: Partial<ProjectSdkParamsService.Params> = {}) {
        if (cachedProjectSdk) {
            return cachedProjectSdk;
        }

        const container = await createProjectSdkContainer(params);
        cachedProjectSdk = new ProjectSdk(container);

        return cachedProjectSdk;
    }

    // Project-related methods.
    getProject() {
        return this.container.resolve(GetProject).execute();
    }

    getProjectConfig(params?: GetProjectConfig.Params) {
        return this.container.resolve(GetProjectConfig).execute(params);
    }

    validateProjectConfig(projectConfig: ValidateProjectConfig.Params) {
        return this.container.resolve(ValidateProjectConfig).execute(projectConfig);
    }

    getProjectInfo() {
        return this.container.resolve(GetProjectInfo).execute();
    }

    // App-related methods.
    async getApp(appName: GetApp.Params) {
        return this.container.resolve(GetApp).execute(appName);
    }

    async getAppOutput(params: GetAppOutput.Params) {
        return this.container.resolve(GetAppOutput).execute(params);
    }

    async getAppStackOutput<
        TOutput extends GetAppStackOutput.StackOutput = GetAppStackOutput.StackOutput
    >(params: GetAppStackOutput.Params) {
        return this.container.resolve(GetAppStackOutput).execute<TOutput>(params);
    }

    async getAppStackExport<
        TExport extends GetAppStackExport.StackExport = GetAppStackExport.StackExport
    >(params: GetAppStackExport.Params) {
        return this.container.resolve(GetAppStackExport).execute<TExport>(params);
    }

    buildApp(params: BuildApp.Params, options: BuildApp.Options = {}) {
        return this.container.resolve(BuildApp).execute(params, options);
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

    // Utility methods.
    isValidRegionName(name?: string) {
        return isValidRegionName(name);
    }

    isValidVariantName(name?: string) {
        return isValidVariantName(name);
    }

    isTelemetryEnabled() {
        return this.container.resolve(IsTelemetryEnabled).execute();
    }

    isCi() {
        return this.container.resolve(IsCi).execute();
    }

    getLogger() {
        return this.container.resolve(LoggerService);
    }

    getContainer() {
        return this.container;
    }
}
