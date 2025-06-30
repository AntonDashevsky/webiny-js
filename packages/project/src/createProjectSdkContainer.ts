import { Container } from "@webiny/di-container";
import { AfterBuildHook, AfterDeployHook, BeforeBuildHook, BeforeDeployHook } from "~/abstractions";
import {
    buildApp,
    deployApp,
    getApp,
    getProject,
    getProjectInfo
} from "./features";
import {
    afterBuildHooksRegistry,
    afterDeployHooksRegistry,
    beforeBuildHooksRegistry,
    beforeDeployHooksRegistry,
    buildAppService,
    deployAppService,
    getAppPackagesService,
    getAppService,
    getIsCiService,
    getNpmVersionService,
    getNpxVersionService,
    getProjectService,
    getPulumiService,
    getPulumiVersionService,
    getYarnVersionService,
    loggerService,
    projectInfoService,
    pulumiGetConfigPassphraseService,
    pulumiGetSecretsProviderService,
    pulumiGetStackOutputService,
    pulumiLoginService,
    pulumiSelectStackService
} from "./services";

export const createProjectSdkContainer = () => {
    const container = new Container();

    // Services.
    container.register(getIsCiService).inSingletonScope();
    container.register(getNpmVersionService).inSingletonScope();
    container.register(getNpxVersionService).inSingletonScope();
    container.register(getPulumiVersionService).inSingletonScope();
    container.register(getYarnVersionService).inSingletonScope();
    container.register(projectInfoService).inSingletonScope();
    container.register(getProjectService).inSingletonScope();
    container.register(getPulumiService).inSingletonScope();
    container.register(getAppService).inSingletonScope();
    container.register(buildAppService).inSingletonScope();
    container.register(deployAppService).inSingletonScope();
    container.register(getAppPackagesService).inSingletonScope();
    container.register(loggerService).inSingletonScope();
    container.register(pulumiGetConfigPassphraseService).inSingletonScope();
    container.register(pulumiGetSecretsProviderService).inSingletonScope();

    container.register(pulumiGetStackOutputService).inSingletonScope();
    container.register(pulumiLoginService).inSingletonScope();
    container.register(pulumiSelectStackService).inSingletonScope();

    // Services - hooks.
    container.register(afterBuildHooksRegistry).inSingletonScope();
    container.register(afterDeployHooksRegistry).inSingletonScope();
    container.register(beforeBuildHooksRegistry).inSingletonScope();
    container.register(beforeDeployHooksRegistry).inSingletonScope();

    // Features.
    container.register(getProject).inSingletonScope();
    container.register(getApp).inSingletonScope();
    container.register(buildApp).inSingletonScope();
    container.register(deployApp).inSingletonScope();
    container.register(getProjectInfo).inSingletonScope();

    return container;
};
