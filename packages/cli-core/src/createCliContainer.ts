import { Container } from "@webiny/di-container";
import path from "path";
import {
    cliParamsService,
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
import { CliParamsService, GetProjectSdkService, LoadEnvVarsService, UiService } from "~/abstractions";
import { GracefulError } from "~/utils/GracefulError";
import chalk from "chalk";

const { bgYellow, bold } = chalk;

export const createCliContainer = async (params: CliParamsService.Params) => {
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
    container.register(cliParamsService).inSingletonScope();
    container.register(commandsRegistryService).inSingletonScope();
    container.register(getCliRunnerService).inSingletonScope();
    container.register(getProjectSdkService).inSingletonScope();
    container.register(loadEnvVarsService).inSingletonScope();
    container.register(loggerService).inSingletonScope();
    container.register(runCliRunnerService).inSingletonScope();
    container.register(stdioService).inSingletonScope();
    container.register(uiService).inSingletonScope();

    // Extensions.
    const ui = container.resolve(UiService);

    // TODO: not sure how I feel about this. We should probably revisit this.
    try {
        // Immediately set CLI instance params via the `CliParamsService`.
        container.resolve(CliParamsService).set(params);
        await container.resolve(LoadEnvVarsService).execute();

        const projectSdk = await container.resolve(GetProjectSdkService).execute();


        const projectConfig = await projectSdk.getProjectConfig();

        try {
            await projectSdk.validateProjectConfig(projectConfig);
        } catch (error) {
            ui.error("Project configuration validation failed.");
            ui.error(error.message);
            throw error;
        }

        const project = await projectSdk.getProject();

        const commands = projectConfig.extensionsByType<{ src: string }>("cliCommand");
        for (const command of commands) {
            const importPath = path.join(project.paths.rootFolder.absolute, command.params.src);
            const { default: commandImplementation } = await import(importPath);
            container.register(commandImplementation).inSingletonScope();
        }
    } catch (error) {
        const ui = container.resolve(UiService);
        if (error && error instanceof GracefulError) {
            ui.newLine();
            ui.text(bgYellow(bold("💡 How can I resolve this?")));
            ui.text(error.message);
        }

        // Unfortunately, yargs doesn't provide passed args here, so we had to do it via process.argv.
        const debugEnabled = process.argv.includes("--debug");
        if (debugEnabled) {
            ui.newLine();

            let causeError = error;
            if (error.cause) {
                causeError = error.cause as Error;
            }

            ui.debug(causeError.stack);
        }

        process.exit(1);
    }

    // Decorators.
    container.registerDecorator(commandsWithGracefulErrorHandling);
    container.registerDecorator(deployCommandWithTelemetry);

    return container;
};
