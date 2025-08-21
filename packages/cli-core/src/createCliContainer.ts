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
import {
    CliParamsService,
    GetProjectSdkService,
    LoadEnvVarsService,
    UiService
} from "~/abstractions/index.js";
import { GracefulError } from "~/utils/GracefulError.js";
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

        const projectConfig = await projectSdk.getProjectConfig({
            tags: { runtimeContext: "cli" }
        });

        await projectSdk.validateProjectConfig(projectConfig);

        const project = await projectSdk.getProject();

        const commands = projectConfig.extensionsByType<any>("cliCommand");
        for (const command of commands) {
            const importPath = path.join(project.paths.rootFolder.absolute, command.params.src);
            const { default: commandImplementation } = await import(importPath);
            container.register(commandImplementation).inSingletonScope();
        }
    } catch (error) {
        const ui = container.resolve(UiService);

        let realError = error;
        if (error.cause) {
            realError = error.cause as Error;
        }

        ui.error("An error occurred while initializing the CLI:");
        ui.text(realError.message);

        // Unfortunately, yargs doesn't provide passed args here, so we had to do it via process.argv.
        const debugEnabled = process.argv.includes("--debug");
        if (debugEnabled) {
            realError.stack && ui.debug(realError.stack);
        }

        if (error && error instanceof GracefulError) {
            ui.newLine();
            ui.text(bgYellow(bold("💡 How can I resolve this?")));
            ui.text(error.message);
        }

        process.exit(1);
    }

    // Decorators.
    container.registerDecorator(commandsWithGracefulErrorHandling);
    container.registerDecorator(deployCommandWithTelemetry);

    return container;
};
