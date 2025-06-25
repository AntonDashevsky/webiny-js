import { createImplementation } from "@webiny/di-container";
import { LoggerService } from "~/abstractions";

export class DefaultLoggerService implements LoggerService.Interface {
    log(message?: any, ...optionalParams: any[]) {
        console.log(message, ...optionalParams);
    }

    info(message?: any, ...optionalParams: any[]) {
        console.info(message, ...optionalParams);
    }

    warn(message?: any, ...optionalParams: any[]) {
        console.warn(message, ...optionalParams);
    }

    error(message?: any, ...optionalParams: any[]) {
        console.error(message, ...optionalParams);
    }
}

export const loggerService = createImplementation({
    abstraction: LoggerService,
    implementation: DefaultLoggerService,
    dependencies: []
});
