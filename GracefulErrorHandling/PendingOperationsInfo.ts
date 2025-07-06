import { createImplementation } from "@webiny/di-container";
import { GracefulErrorHandler } from "~/abstractions/index.js";
import chalk from "chalk";

const MATCH_STRING = "the stack is currently locked by";

export class PendingOperationsInfo implements GracefulErrorHandler.Interface {
    execute(error: Error) {
        const { message } = error;

        const projectApplicationName = context.projectApplication?.id || `PROJECT_APPLICATION`;
        const environmentName = context.commandParams?.env || `ENVIRONMENT_NAME`;

        if (typeof message === "string" && message.includes(MATCH_STRING)) {
            const cmd = `yarn webiny pulumi ${projectApplicationName} --env ${environmentName} -- cancel`;

            const message = [
                `The Pulumi error you've just experienced can occur`,
                `if one of the previous deployments has been interrupted or another deployment`,
                `is already in progress. For development purposes, the quickest way to get`,
                `past this issue is to run the following command: ${chalk.blue(cmd)}.`
            ].join(" ");

            const learnMore = "https://webiny.link/locked-stacks";

            return { message, learnMore };
        }
        return undefined;
    }
}

export const pendingOperationsInfo = createImplementation({
    abstraction: GracefulErrorHandler,
    implementation: PendingOperationsInfo,
    dependencies: []
});
