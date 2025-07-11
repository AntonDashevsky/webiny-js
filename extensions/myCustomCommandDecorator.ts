import { createDecorator } from "@webiny/di-container";
import { Command, ErrorHandler } from "@webiny/cli-core/abstractions/index.js";

export class MyCustomCommandDecorator<TParams> implements Command.Interface<TParams> {
    constructor(
        private gracefulErrorHandlers: ErrorHandler.Interface<TParams>[],
        private decoratee: Command.Interface<TParams>
    ) {}

    execute() {
        const command = this.decoratee.execute();

        const originalCommandHandler = command.handler;

        command.handler = async (params: TParams) => {
            await originalCommandHandler(params);
        };

        return command;
    }
}

export default createDecorator({
    abstraction: Command,
    decorator: MyCustomCommandDecorator,
    dependencies: [[ErrorHandler, { multiple: true }]]
});
