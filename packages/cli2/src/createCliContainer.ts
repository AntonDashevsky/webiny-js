import { Container } from "@webiny/di-container";

import {
    commandsRegistryService,
    getProjectSdkService,
    loadEnvVarsService,
    loggerService,
    messagingService
} from "./services/index.js";

import { aboutCommand, infoCommand } from "./features/index.js";

export const createCliContainer = () => {
    const container = new Container();

    // Features (commands).
    container.register(aboutCommand).inSingletonScope();
    container.register(infoCommand).inSingletonScope();

    // Services.
    container.register(commandsRegistryService).inSingletonScope();
    container.register(getProjectSdkService).inSingletonScope();
    container.register(loadEnvVarsService).inSingletonScope();
    container.register(loggerService).inSingletonScope();
    container.register(messagingService).inSingletonScope();

    return container;
};
