import { Container } from "@webiny/di-container";

import {
    commandsRegistryService,
    getProjectSdkService,
    loadEnvVarsService,
    loggerService,
    stdioService
} from "./services/index.js";

import {
    aboutCommand,
    buildCommand,
    deployCommand,
    infoCommand,
    outputCommand
} from "./features/index.js";

export const createCliContainer = () => {
    const container = new Container();

    // Features (commands).
    container.register(aboutCommand).inSingletonScope();
    container.register(buildCommand).inSingletonScope();
    container.register(deployCommand).inSingletonScope();
    container.register(infoCommand).inSingletonScope();
    container.register(outputCommand).inSingletonScope();

    // Services.
    container.register(commandsRegistryService).inSingletonScope();
    container.register(getProjectSdkService).inSingletonScope();
    container.register(loadEnvVarsService).inSingletonScope();
    container.register(loggerService).inSingletonScope();
    container.register(stdioService).inSingletonScope();

    return container;
};
