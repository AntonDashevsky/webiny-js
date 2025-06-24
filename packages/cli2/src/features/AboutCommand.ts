import { createImplementation } from "@webiny/di-container";
import { ICommand, CommandAbstraction, ILoggerService, LoggerServiceAbstraction } from "~/abstractions";

export class AboutCommand implements ICommand {

    logger: ILoggerService;

    constructor(logger: ILoggerService, project: IProject) {
        this.logger = logger;
        this.project = project;
    }

    getDefinition() {
        return {
            name: 'about',
            description: 'Prints out information helpful for debugging purposes',
            options: {
                json: {
                    type: "boolean",
                    default: false,
                    describe: "Emit output as JSON."
                }
            }
        }
    }

    execute() {

    }
}

export const aboutCommand = createImplementation({
    abstraction: CommandAbstraction,
    implementation: AboutCommand,
    dependencies: [LoggerServiceAbstraction, ProjectAbstraction]
});
