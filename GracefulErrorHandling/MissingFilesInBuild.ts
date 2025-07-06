import { createImplementation } from "@webiny/di-container";
import { GracefulErrorHandler } from "~/abstractions/index.js";
import chalk from "chalk";

const MATCH_STRING = "failed to compute archive hash for";

export class MissingFilesInBuild implements GracefulErrorHandler.Interface {
    execute(error: Error) {
        const { message } = error;

        if (message.includes(MATCH_STRING)) {
            const cmd = chalk.red(`yarn webiny build {APP_NAME} --env {ENVIRONMENT_NAME}`);
            return {
                message: [
                    `Looks like the deployment failed because Pulumi could not retrieve the built code.`,
                    `Please try again, or, alternatively, try building the project application you're`,
                    `trying to deploy by running ${cmd}.`
                ].join(" ")
            };
        }
        return undefined;
    }
}

export const missingFilesInBuild = createImplementation({
    abstraction: GracefulErrorHandler,
    implementation: MissingFilesInBuild,
    dependencies: []
});
