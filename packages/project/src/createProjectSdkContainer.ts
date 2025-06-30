import { Container } from "@webiny/di-container";
import { AfterBuildHook, AfterDeployHook, BeforeBuildHook, BeforeDeployHook } from "~/abstractions";
import {
    buildAppCommand,
    deployAppCommand,
    getAppCommand,
    getProjectCommand,
    getProjectInfoCommand
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

export type CreateProjectContainerOptions = Partial<{
    beforeBuildHooks: BeforeBuildHook.Interface[];
    afterBuildHooks: AfterBuildHook.Interface[];
    beforeDeployHooks: BeforeDeployHook.Interface[];
    afterDeployHooks: AfterDeployHook.Interface[];
}>;

export const createProjectSdkContainer = (options: CreateProjectContainerOptions = {}) => {
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
    container.register(getProjectCommand).inSingletonScope();
    container.register(getAppCommand).inSingletonScope();
    container.register(buildAppCommand).inSingletonScope();
    container.register(deployAppCommand).inSingletonScope();
    container.register(getProjectInfoCommand).inSingletonScope();

    // Extra implementations.
    if (Array.isArray(options.beforeBuildHooks)) {
        options.beforeBuildHooks.forEach(hook => {
            // @ts-ignore TODO: FIX TYPES
            container.register(hook);
        });
    }

    if (Array.isArray(options.afterBuildHooks)) {
        options.afterBuildHooks.forEach(hook => {
            // @ts-ignore TODO: FIX TYPES
            container.register(hook);
        });
    }

    if (Array.isArray(options.beforeDeployHooks)) {
        options.beforeDeployHooks.forEach(hook => {
            // @ts-ignore TODO: FIX TYPES
            container.register(hook);
        });
    }

    if (Array.isArray(options.afterDeployHooks)) {
        options.afterDeployHooks.forEach(hook => {
            // @ts-ignore TODO: FIX TYPES
            container.register(hook);
        });
    }

    return container;
};
