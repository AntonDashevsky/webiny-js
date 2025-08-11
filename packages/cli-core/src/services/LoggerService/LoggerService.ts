import { createImplementation } from "@webiny/di-container";
import { createPinoLogger as baseCreatePinoLogger, Logger } from "@webiny/logger";
import { LoggerService } from "~/abstractions/index.js";
import * as fs from "node:fs";
import path from "node:path";

export class DefaultLoggerService implements LoggerService.Interface {
    pinoLogger: Logger;

    constructor() {
        // Wanted to use GetProjectSdkService to get project root path, but
        // to get that, had to call async method, which is not allowed in constructor.
        // TODO: implement a better way to get project root path.
        const logFilePath = path.join(process.cwd(), "logs.txt");

        // Ensure the file exists or can be appended to
        const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

        this.pinoLogger = baseCreatePinoLogger(
            {
                level: process.env.LOG_LEVEL || "info"
            },
            logStream // write directly to file instead of console
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
