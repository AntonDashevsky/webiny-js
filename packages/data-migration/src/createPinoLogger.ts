import chalk from "chalk";
import pinoPretty from "pino-pretty";
import type { DataMigration } from "~/types";
import type { Logger } from "@webiny/logger";
import { createPinoLogger as baseCreatePinoLogger, getLogLevel } from "@webiny/logger";

export const createPinoLogger = () => {
    return baseCreatePinoLogger(
        {
            level: getLogLevel(process.env.MIGRATIONS_LOG_LEVEL, "trace")
        },
        pinoPretty({
            ignore: "pid,hostname"
        })
    );
};

export const getChildLogger = (logger: Logger, migration: DataMigration) => {
    return logger.child({}, { msgPrefix: chalk.blueBright(`[${migration.getId()}]`) + " " });
};
