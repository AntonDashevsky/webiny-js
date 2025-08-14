import { Container } from "@webiny/di-container";
import {
    buildApp,
    deployApp,
    destroyApp,
    getApp,
    getAppOutput,
    getProject,
    getProjectConfig,
    getProjectInfo,
    isCi,
    isTelemetryEnabled,
    refreshApp,
    runPulumiCommand,
    validateProjectConfig,
    watch,

    // Hooks.
    apiAfterBuild,
    apiAfterDeploy,
    apiBeforeBuild,
    apiBeforeDeploy,
    adminAfterBuild,
    adminAfterDeploy,
    adminBeforeBuild,
    adminBeforeDeploy,
    coreAfterBuild,
    coreAfterDeploy,
    coreBeforeBuild,
    coreBeforeDeploy,
    websiteAfterBuild,
    websiteAfterDeploy,
    websiteBeforeBuild,
    websiteBeforeDeploy,

    // Pulumi.
    corePulumi
} from "./features/index.js";

import {
    getAppPackagesService,
    getCwdService,
    getIsCiService,
    getNpmVersionService,
    getNpxVersionService,
    getProjectConfigService,
    getProjectService,
    getPulumiService,
    getPulumiVersionService,
    getYarnVersionService,
    listAppLambdaFunctionsService,
    listPackagesService,
    listPackagesInAppWorkspaceService,
    loggerService,
    projectInfoService,
    projectSdkParamsService,
    pulumiGetConfigPassphraseService,
    pulumiGetSecretsProviderService,
    pulumiGetStackExportService,
    pulumiGetStackOutputService,
    pulumiLoginService,
    pulumiSelectStackService,
    stdioService,
    uiService,
    validateProjectConfigService
} from "./services/index.js";

import { buildAppWithHooks, deployAppWithHooks } from "./decorators/index.js";

import {
    GetProject,
    GetProjectConfig,
    ProjectSdkParamsService,
    ValidateProjectConfig
} from "~/abstractions";
import path from "path";

export const createProjectSdkContainer = async (
    params: Partial<ProjectSdkParamsService.Params>
) => {
    const container = new Container();

    // Services.
    container.register(projectSdkParamsService).inSingletonScope();
    container.register(getAppPackagesService).inSingletonScope();
    container.register(getCwdService).inSingletonScope();
    container.register(getIsCiService).inSingletonScope();
    container.register(getNpmVersionService).inSingletonScope();
    container.register(getNpxVersionService).inSingletonScope();
    container.register(getProjectConfigService).inSingletonScope();
    container.register(getProjectService).inSingletonScope();
    container.register(getPulumiService).inSingletonScope();
    container.register(getPulumiVersionService).inSingletonScope();
    container.register(getYarnVersionService).inSingletonScope();
    container.register(listAppLambdaFunctionsService).inSingletonScope();
    container.register(listPackagesService).inSingletonScope();
    container.register(listPackagesInAppWorkspaceService).inSingletonScope();
    container.register(loggerService).inSingletonScope();
    container.register(projectInfoService).inSingletonScope();
    container.register(pulumiGetConfigPassphraseService).inSingletonScope();
    container.register(pulumiGetSecretsProviderService).inSingletonScope();
    container.register(pulumiGetStackExportService).inSingletonScope();
    container.register(pulumiGetStackOutputService).inSingletonScope();
    container.register(pulumiLoginService).inSingletonScope();
    container.register(pulumiSelectStackService).inSingletonScope();
    container.register(stdioService).inSingletonScope();
    container.register(uiService).inSingletonScope();
    container.register(validateProjectConfigService).inSingletonScope();

    // Features.
    container.register(buildApp).inSingletonScope();
    container.register(deployApp).inSingletonScope();
    container.register(destroyApp).inSingletonScope();
    container.register(getApp).inSingletonScope();
    container.register(getAppOutput).inSingletonScope();
    container.register(getProject).inSingletonScope();
    container.register(getProjectConfig).inSingletonScope();
    container.register(getProjectInfo).inSingletonScope();
    container.register(isCi).inSingletonScope();
    container.register(isTelemetryEnabled).inSingletonScope();
    container.register(refreshApp).inSingletonScope();
    container.register(runPulumiCommand).inSingletonScope();
    container.register(validateProjectConfig).inSingletonScope();
    container.register(watch).inSingletonScope();

    // Hooks.
    container.registerComposite(apiBeforeBuild);
    container.registerComposite(apiBeforeDeploy);
    container.registerComposite(apiAfterBuild);
    container.registerComposite(apiAfterDeploy);
    container.registerComposite(adminBeforeBuild);
    container.registerComposite(adminBeforeDeploy);
    container.registerComposite(adminAfterBuild);
    container.registerComposite(adminAfterDeploy);
    container.registerComposite(coreBeforeBuild);
    container.registerComposite(coreBeforeDeploy);
    container.registerComposite(coreAfterBuild);
    container.registerComposite(coreAfterDeploy);
    container.registerComposite(websiteBeforeBuild);
    container.registerComposite(websiteBeforeDeploy);
    container.registerComposite(websiteAfterBuild);
    container.registerComposite(websiteAfterDeploy);

    // Decorators.
    container.registerDecorator(buildAppWithHooks);
    container.registerDecorator(deployAppWithHooks);

    // Immediately set CLI instance params via the `CliParamsService`.
    container.resolve(ProjectSdkParamsService).set(params);

    // Extensions.
    const project = await container.resolve(GetProject).execute();
    const projectExtensions = await container.resolve(GetProjectConfig).execute({
        tags: { runtimeContext: "project" }
    });

    await container.resolve(ValidateProjectConfig).execute(projectExtensions);

    // Hooks.
    const hooksExtensions = [
        ...projectExtensions.extensionsByType("Admin/BeforeBuild"),
        ...projectExtensions.extensionsByType("Admin/BeforeDeploy"),
        ...projectExtensions.extensionsByType("Admin/AfterBuild"),
        ...projectExtensions.extensionsByType("Admin/AfterDeploy"),
        ...projectExtensions.extensionsByType("Api/BeforeBuild"),
        ...projectExtensions.extensionsByType("Api/BeforeDeploy"),
        ...projectExtensions.extensionsByType("Api/AfterBuild"),
        ...projectExtensions.extensionsByType("Api/AfterDeploy"),
        ...projectExtensions.extensionsByType("Core/BeforeBuild"),
        ...projectExtensions.extensionsByType("Core/BeforeDeploy"),
        ...projectExtensions.extensionsByType("Core/AfterBuild"),
        ...projectExtensions.extensionsByType("Core/AfterDeploy"),
        ...projectExtensions.extensionsByType("Website/BeforeBuild"),
        ...projectExtensions.extensionsByType("Website/BeforeDeploy"),
        ...projectExtensions.extensionsByType("Website/AfterBuild"),
        ...projectExtensions.extensionsByType("Website/AfterDeploy")
    ];

    for (const hookExtension of hooksExtensions) {
        const importPath = path.join(project.paths.rootFolder.absolute, hookExtension.params.src);
        const { default: hookImplementation } = await import(importPath);
        container.register(hookImplementation).inSingletonScope();
    }

    const pulumiExtensions = [
        ...projectExtensions.extensionsByType("Core/Pulumi"),
        ...projectExtensions.extensionsByType("Api/Pulumi"),
        ...projectExtensions.extensionsByType("Admin/Pulumi"),
        ...projectExtensions.extensionsByType("Website/Pulumi")
    ];

    for (const pulumiExtension of pulumiExtensions) {
        const importPath = path.join(project.paths.rootFolder.absolute, pulumiExtension.params.src);
        const { default: pulumiImplementation } = await import(importPath);
        container.register(pulumiImplementation).inSingletonScope();
    }

    // Pulumi.
    container.registerComposite(corePulumi);

    return container;
};
