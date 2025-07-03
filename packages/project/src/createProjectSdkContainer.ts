import { Container } from "@webiny/di-container";
import {
    buildApp,
    deployApp,
    destroyApp,
    getApp,
    getAppOutput,
    getProject,
    getProjectInfo,
    refreshApp,
    runPulumiCommand,
    watch
} from "./features/index.js";
import {
    getAppPackagesService,
    getIsCiService,
    getNpmVersionService,
    getNpxVersionService,
    getProjectService,
    getPulumiService,
    getPulumiVersionService,
    getYarnVersionService,
    listAppLambdaFunctions,
    loggerService,
    projectInfoService,
    pulumiGetConfigPassphraseService,
    pulumiGetSecretsProviderService,
    pulumiGetStackExportService,
    pulumiGetStackOutputService,
    pulumiLoginService,
    pulumiSelectStackService
} from "./services/index.js";

export const createProjectSdkContainer = () => {
    const container = new Container();

    // Services.
    container.register(getAppPackagesService).inSingletonScope();
    container.register(getIsCiService).inSingletonScope();
    container.register(getNpmVersionService).inSingletonScope();
    container.register(getNpxVersionService).inSingletonScope();
    container.register(getProjectService).inSingletonScope();
    container.register(getPulumiService).inSingletonScope();
    container.register(getPulumiVersionService).inSingletonScope();
    container.register(getYarnVersionService).inSingletonScope();
    container.register(listAppLambdaFunctions).inSingletonScope();
    container.register(loggerService).inSingletonScope();
    container.register(projectInfoService).inSingletonScope();
    container.register(pulumiGetConfigPassphraseService).inSingletonScope();
    container.register(pulumiGetSecretsProviderService).inSingletonScope();
    container.register(pulumiGetStackExportService).inSingletonScope();
    container.register(pulumiGetStackOutputService).inSingletonScope();
    container.register(pulumiLoginService).inSingletonScope();
    container.register(pulumiSelectStackService).inSingletonScope();

    // Features.
    container.register(buildApp).inSingletonScope();
    container.register(deployApp).inSingletonScope();
    container.register(destroyApp).inSingletonScope();
    container.register(getApp).inSingletonScope();
    container.register(getAppOutput).inSingletonScope();
    container.register(getProject).inSingletonScope();
    container.register(getProjectInfo).inSingletonScope();
    container.register(refreshApp).inSingletonScope();
    container.register(runPulumiCommand).inSingletonScope();
    container.register(watch).inSingletonScope();

    return container;
};
