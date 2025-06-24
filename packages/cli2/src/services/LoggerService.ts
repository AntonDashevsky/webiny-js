import { createImplementation } from "@webiny/di-container";
import { ILoggerService, LoggerServiceAbstraction } from "~/abstractions";

export class LoggerService implements ILoggerService {
    log(message: string): void {
        console.log(message);
    }

    error(message: string): void {
        console.error(message);
    }

    warn(message: string): void {
        console.warn(message);
    }

    info(message: string): void {
        console.info(message);
    }
}

export const consoleLogger = createImplementation({
    abstraction: LoggerServiceAbstraction,
    implementation: LoggerService,
    dependencies: []
});
