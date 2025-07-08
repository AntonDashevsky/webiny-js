import { createDecorator } from "@webiny/di-container";
import { isEnabled as isTelemetryEnabled, sendEvent as telemetrySendEvent } from "@webiny/telemetry/cli.js";
import { Command } from "~/abstractions/index.js";
import { IDeployCommandParams } from "~/features";
import { GracefulError } from "~/utils/GracefulError";

const isDeployCommand = (
    command: Command.CommandDefinition<any>
): command is Command.CommandDefinition<IDeployCommandParams> => {
    return command.name === "deploy";
};

export class DeployCommandWithTelemetry<TParams> implements Command.Interface<TParams> {
    constructor(private decoratee: Command.Interface<TParams>) {}

    execute() {
        const command = this.decoratee.execute();

        if (!isTelemetryEnabled()) {
            return command;
        }

        if (!isDeployCommand(command)) {
            // If the command is not a `deploy` command, we do not need to wrap it with telemetry.
            return command;
        }

        // Getting a different type without type assertion. :|
        const deployCommand = command as Command.CommandDefinition<IDeployCommandParams>;
        const originalCommandHandler = deployCommand.handler;

        deployCommand.handler = async (params: IDeployCommandParams) => {
            const telemetryProperties = {
                env: params.env || "unknown",
                variant: params.variant || "unknown",
                commandParams: JSON.stringify(params)
            };

            try {
                await this.sentEvent("start", telemetryProperties);

                const result = await originalCommandHandler(params);

                await this.sentEvent("end", telemetryProperties);

                return result;
            } catch (error) {
                if (error instanceof GracefulError) {
                    await this.sentEvent("error-graceful", telemetryProperties);
                } else {
                    await this.sentEvent("error", {
                        ...telemetryProperties,
                        error: error.message
                    });
                }

                throw error;
            }
        }

        return command;
    }

    private sentEvent(stage: string, properties: Record<string, any>) {
        const event = `cli-pulumi-command-deploy-${stage}`;
        return telemetrySendEvent({
            event,
            properties
        });
    }
}

export const deployCommandWithTelemetry = createDecorator({
    abstraction: Command,
    decorator: DeployCommandWithTelemetry,
    dependencies: []
});
