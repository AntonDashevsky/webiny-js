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
    refreshApp,
    runPulumiCommand,
    watch
} from "./features/index.js";

import {
    getAppPackagesService,
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
    loggerService,
    projectInfoService,
    projectSdkParamsService,
    pulumiGetConfigPassphraseService,
    pulumiGetSecretsProviderService,
    pulumiGetStackExportService,
    pulumiGetStackOutputService,
    pulumiLoginService,
    pulumiSelectStackService,
    validateProjectConfigService
} from "./services/index.js";
import { ProjectSdkParamsService } from "~/abstractions";

export const createProjectSdkContainer = (params: ProjectSdkParamsService.Params) => {
    const container = new Container();

    // Services.
    container.register(projectSdkParamsService).inSingletonScope();
    container.register(getAppPackagesService).inSingletonScope();
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
    container.register(loggerService).inSingletonScope();
    container.register(projectInfoService).inSingletonScope();
    container.register(pulumiGetConfigPassphraseService).inSingletonScope();
    container.register(pulumiGetSecretsProviderService).inSingletonScope();
    container.register(pulumiGetStackExportService).inSingletonScope();
    container.register(pulumiGetStackOutputService).inSingletonScope();
    container.register(pulumiLoginService).inSingletonScope();
    container.register(pulumiSelectStackService).inSingletonScope();
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
    container.register(refreshApp).inSingletonScope();
    container.register(runPulumiCommand).inSingletonScope();
    container.register(watch).inSingletonScope();

    // Immediately set the params in the ProjectSdkParamsService.
    container.resolve(ProjectSdkParamsService).set(params);

    return container;
};
