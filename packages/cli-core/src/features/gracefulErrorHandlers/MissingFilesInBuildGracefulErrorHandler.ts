import { createImplementation } from "@webiny/di-container";
import chalk from "chalk";
import { ErrorHandler } from "~/abstractions/index.js";
import { IBaseAppParams } from "~/abstractions/features/types.js";
import { GracefulError } from "@webiny/project";

const MATCH_STRING = "failed to compute archive hash for";

export class MissingFilesInBuildGracefulErrorHandler
    implements ErrorHandler.Interface<IBaseAppParams>
{
    execute({ error, params }: ErrorHandler.Params<IBaseAppParams>) {
        if (!error.message) {
            return;
        }

        if (!error.message.includes(MATCH_STRING)) {
            return;
        }

        const cmd = chalk.red(`yarn webiny build ${params.app} --env ${params.env}`);
        throw new GracefulError(
            [
                `Looks like the deployment failed because Pulumi could not retrieve the built code.`,
                `Please try again, or, alternatively, try building the project application you're`,
                `trying to deploy by running ${cmd}.`
            ].join(" "),
            { cause: error }
        );
    }
}

export const missingFilesInBuildGracefulErrorHandler = createImplementation({
    abstraction: ErrorHandler,
    implementation: MissingFilesInBuildGracefulErrorHandler,
    dependencies: []
});
