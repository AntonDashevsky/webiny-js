import { createImplementation } from "@webiny/di-container";
import { createPinoLogger as baseCreatePinoLogger, Logger } from "@webiny/logger";
import pinoPretty from "pino-pretty";
import { LoggerService } from "~/abstractions";

export class DefaultLoggerService implements LoggerService.Interface {
    pinoLogger: Logger;

    constructor() {
        this.pinoLogger = baseCreatePinoLogger(
            {},
            pinoPretty({
                ignore: "pid,hostname"
            })
        );
    }

    trace(message?: any, ...optionalParams: any[]) {
        this.pinoLogger.trace(message, ...optionalParams);
    }

    fatal(message?: any, ...optionalParams: any[]) {
        this.pinoLogger.fatal(message, ...optionalParams);
    }

    debug(message?: any, ...optionalParams: any[]) {
        this.pinoLogger.debug(message, ...optionalParams);
    }

    info(message?: any, ...optionalParams: any[]) {
        this.pinoLogger.info(message, ...optionalParams);
    }

    warn(message?: any, ...optionalParams: any[]) {
        this.pinoLogger.warn(message, ...optionalParams);
    }

    error(message?: any, ...optionalParams: any[]) {
        this.pinoLogger.error(message, ...optionalParams);
    }

    log(message?: any, ...optionalParams: any[]) {
        this.pinoLogger.info(message, ...optionalParams);
    }
}

export const loggerService = createImplementation({
    abstraction: LoggerService,
    implementation: DefaultLoggerService,
    dependencies: []
});
