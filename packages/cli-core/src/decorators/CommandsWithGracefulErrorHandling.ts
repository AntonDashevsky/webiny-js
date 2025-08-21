import { createDecorator } from "@webiny/di-container";
import { Command, ErrorHandler } from "~/abstractions/index.js";
import { GracefulError } from "~/utils/GracefulError.js";

export class CommandsWithGracefulErrorHandling<TParams> implements Command.Interface<TParams> {
    constructor(
        private gracefulErrorHandlers: ErrorHandler.Interface<TParams>[],
        private decoratee: Command.Interface<TParams>
    ) {}

    async execute() {
        const command = await this.decoratee.execute();

        const originalCommandHandler = command.handler;

        command.handler = async (params: TParams) => {
            try {
                await originalCommandHandler(params);
            } catch (error) {
                if (error instanceof GracefulError) {
                    throw error;
                }

                for (const gracefulErrorHandler of this.gracefulErrorHandlers) {
                    gracefulErrorHandler.execute({
                        error,
                        command,
                        params
                    });
                }

                throw error;
            }
        };

        return command;
    }
}

export const commandsWithGracefulErrorHandling = createDecorator({
    abstraction: Command,
    decorator: CommandsWithGracefulErrorHandling,
    dependencies: [[ErrorHandler, { multiple: true }]]
});
