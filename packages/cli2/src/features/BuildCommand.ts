import { createImplementation } from "@webiny/di-container";
import { ICommand, CommandAbstraction, ILogger, LoggerAbstraction } from "~/abstractions";

export class BuildCommand implements ICommand {
    // name = "build";
    // description = "Build the project";
    // logger: ILogger;

    constructor(logger: ILogger) {
        this.logger = logger;
    }

    // TODO: samo jedina metoda!
    getDefinition() {
        return {
            name,
            descr,
            run: ....
        }
    }

    // register() {
    //     return
    // }
    // async run(args: string[]) {
    //     this.logger.log("Building project...");
    //     // Your logic here
    // }
}

export const buildCommand = createImplementation({
    abstraction: CommandAbstraction,
    implementation: BuildCommand,
    dependencies: [LoggerAbstraction]
});
