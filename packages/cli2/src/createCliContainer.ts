import { Container } from "@webiny/di-container";
import path from "path";
import {
    commandsRegistryService,
    getCliRunnerService,
    getProjectSdkService,
    loadEnvVarsService,
    loggerService,
    runCliRunnerService,
    stdioService,
    uiService
} from "./services/index.js";

import {
    aboutCommand,
    buildCommand,
    deployCommand,
    destroyCommand,
    infoCommand,
    outputCommand,
    watchCommand,

    // Graceful error handlers.
    ddbPutItemConditionalCheckFailedGracefulErrorHandler,
    missingFilesInBuildGracefulErrorHandler,
    pendingOperationsGracefulErrorHandler
} from "./features/index.js";

import {
    commandsWithGracefulErrorHandling,
    deployCommandWithTelemetry
} from "./decorators/index.js";
import { GetProjectSdkService } from "~/abstractions";

export const createCliContainer = async () => {
    const container = new Container();

    // Features (commands).
    container.register(aboutCommand).inSingletonScope();
    container.register(buildCommand).inSingletonScope();
    container.register(deployCommand).inSingletonScope();
    container.register(destroyCommand).inSingletonScope();
    container.register(infoCommand).inSingletonScope();
    container.register(outputCommand).inSingletonScope();
    container.register(watchCommand).inSingletonScope();

    // Graceful error handlers.
    container.register(ddbPutItemConditionalCheckFailedGracefulErrorHandler).inSingletonScope();
    container.register(missingFilesInBuildGracefulErrorHandler).inSingletonScope();
    container.register(pendingOperationsGracefulErrorHandler).inSingletonScope();

    // Services.
    container.register(commandsRegistryService).inSingletonScope();
    container.register(getCliRunnerService).inSingletonScope();
    container.register(getProjectSdkService).inSingletonScope();
    container.register(loadEnvVarsService).inSingletonScope();
    container.register(loggerService).inSingletonScope();
    container.register(runCliRunnerService).inSingletonScope();
    container.register(stdioService).inSingletonScope();
    container.register(uiService).inSingletonScope();

    // Decorators.
    container.registerDecorator(commandsWithGracefulErrorHandling);
    container.registerDecorator(deployCommandWithTelemetry);

    // Register CLI extensions.
    const projectSdk = container.resolve(GetProjectSdkService).execute();
    const project = await projectSdk.getProject();
    const projectConfig = await projectSdk.getProjectConfig<{
        cliCommands?: { src: string; name: string }[];
    }>();

    console.log('projectConfig', projectConfig.config)

    if (projectConfig.config.cliCommands) {
        for (const command of projectConfig.config.cliCommands) {
            const importPath = path.join(project.paths.rootFolder.absolute, command.src);
            const {default: commandImplementation} = await import(importPath)
            container.register(commandImplementation).inSingletonScope();
        }
    }

    container.registerDecorator(deployCommandWithTelemetry);
    return container;
};
