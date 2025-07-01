import { Container } from "@webiny/di-container";

import {
    getProjectSdkService,
    loadEnvVarsService,
    loggerService,
    messagingService
} from "./services/index.js";

import { aboutCommand } from "./features/index.js";

export const createCliContainer = () => {
    const container = new Container();

    // Features (commands).
    container.register(aboutCommand).inSingletonScope();

    // Services.
    container.register(getProjectSdkService).inSingletonScope();
    container.register(loadEnvVarsService).inSingletonScope();
    container.register(loggerService).inSingletonScope();
    container.register(messagingService).inSingletonScope();

    return container;
};
