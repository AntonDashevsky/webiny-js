import { Container } from "@webiny/di-container";

import {
    getProjectSdkService,
    loadEnvVarsService,
    loggerService,
    messagingService
} from "./services";

import { aboutCommand } from "./features";

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
