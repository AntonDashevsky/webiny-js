import { createDecorator } from "@webiny/di-container";
import { Command } from "~/abstractions/index.js";
import { GracefulError } from "./GracefulError.js";
import { IDeployCommandParams } from "~/features";

const isDeployCommand = (
    command: Command.CommandDefinition<any>
): command is Command.CommandDefinition<IDeployCommandParams> => {
    return command.name === "deploy";
};

const getTelemetryEventName = (stage: string) => `cli-pulumi-command-${name}-${stage}`;

export class CommandsWithTelemetry<TParams> implements Command.Interface<TParams> {
    constructor(private decoratee: Command.Interface<TParams>) {}

    execute() {
        const command = this.decoratee.execute();
        if (!isDeployCommand(command)) {
            // If the command is not a deploy command, we do not need to wrap it with telemetry.
            return command;
        }

        const originalCommandHandler = command.handler;

        const sendTelemetryEvents = telemetry === true && params.telemetry !== false;
        const telemetryProperties = {
            env: params.env || "unknown",
            variant: params.variant || "unknown",
            commandParams: JSON.stringify(params)
        };


        command.handler = async (params: IDeployCommandParams) => {
            try {
                if (sendTelemetryEvents) {
                    const eventName = getTelemetryEventName("start");
                    await sendEvent(eventName, telemetryProperties);
                }

                const result = originalCommandHandler(params);
                const eventName = getTelemetryEventName("end");
                await sendEvent(eventName, telemetryProperties);
                return result;
            } catch (error) {
                if (error instanceof GracefulError) {
                    if (sendTelemetryEvents) {
                        const eventName = getTelemetryEventName("error-graceful");
                        await sendEvent(eventName, telemetryProperties);
                    }
                } else {
                    if (sendTelemetryEvents) {
                        const eventName = getTelemetryEventName("error");
                        await sendEvent(eventName, {
                            ...telemetryProperties,
                            error: error.message
                        });
                    }
                }

                throw error;
            }
        };

        return command;
    }
}

export const commandsWithTelemetry = createDecorator({
    abstraction: Command,
    decorator: CommandsWithTelemetry,
    dependencies: []
});
