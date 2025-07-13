import { createDecorator } from "@webiny/di-container";
import {
    isEnabled as isTelemetryEnabled,
    sendEvent as telemetrySendEvent
} from "@webiny/telemetry/cli.js";
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

    async execute() {
        const command = await this.decoratee.execute();

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
            if ("app" in params) {
                const telemetryProperties = {
                    app: params.app || "unknown",
                    env: params.env || "unknown",
                    variant: params.variant || "unknown",
                    region: params.region || "unknown",
                    commandParams: JSON.stringify(params)
                };

                try {
                    await this.sendEvent("cli-pulumi-command-deploy-start", telemetryProperties);

                    const result = await originalCommandHandler(params);

                    await this.sendEvent("cli-pulumi-command-deploy-end", telemetryProperties);

                    return result;
                } catch (e) {
                    const event =
                        e instanceof GracefulError
                            ? "cli-pulumi-command-deploy-error-graceful"
                            : "cli-pulumi-command-deploy-error";

                    await this.sendEvent(event, {
                        ...telemetryProperties,
                        errorMessage: e.message,
                        errorStack: e.stack
                    });

                    throw e;
                }
            }

            const telemetryProperties = {
                env: params.env || "unknown",
                variant: params.variant || "unknown",
                region: params.region || "unknown",
                commandParams: JSON.stringify(params)
            };

            try {
                await this.sendEvent("cli-project-deploy-start", telemetryProperties);
                const result = await originalCommandHandler(params);
                await this.sendEvent("cli-project-deploy-end", telemetryProperties);
                return result;
            } catch (e) {
                const event =
                    e instanceof GracefulError
                        ? "cli-project-deploy-error-graceful"
                        : "cli-project-deploy-error";

                await this.sendEvent(event, {
                    ...telemetryProperties,
                    errorMessage: e.message,
                    errorStack: e.stack
                });

                throw e;
            }
        };

        return command;
    }

    private sendEvent(event: string, properties: Record<string, any> = {}) {
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
