import { createImplementation } from "@webiny/di-container";
import { ICommand, CommandAbstraction, ILogger, LoggerAbstraction } from "~/abstractions";

export class WatchCommand implements ICommand {
    name = "watch";
    description = "Watch the project";
    logger: ILogger;

    constructor(logger: ILogger) {
        this.logger = logger;
    }

    async run(args: string[]) {
        this.logger.log("Watching project...");
        // Your logic here
    }
}

export const watchCommand = createImplementation({
    abstraction: CommandAbstraction,
    implementation: WatchCommand,
    dependencies: [LoggerAbstraction]
});
