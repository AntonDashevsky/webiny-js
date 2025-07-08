import { createImplementation } from "@webiny/di-container";
import { ErrorHandler } from "~/abstractions/index.js";
import { IBaseAppParams } from "~/abstractions/features/types.js";
import { GracefulError } from "~/utils/GracefulError.js";

const MATCH_STRING = "failed";
const LEARN_MORE_URL = "https://webiny.link/deployment-ddb-conditional-check-failed";

export class DdbPutItemConditionalCheckFailedGracefulErrorHandler
    implements ErrorHandler.Interface<IBaseAppParams>
{
    execute({ error }: ErrorHandler.Params<IBaseAppParams>) {
        console.log(error.message);
        if (!error.message.includes(MATCH_STRING)) {
            return;
        }

        throw new GracefulError(
            [
                `Looks like the deployment failed because Pulumi tried to insert a`,
                `record into a DynamoDB table, but the record already exists. The`,
                `easiest way to resolve this is to delete the record from the`,
                `table and try again.`,
                `Learn more: ${LEARN_MORE_URL}`
            ].join(" "),
            { cause: error }
        );
    }
}

export const ddbPutItemConditionalCheckFailedGracefulErrorHandler = createImplementation({
    abstraction: ErrorHandler,
    implementation: DdbPutItemConditionalCheckFailedGracefulErrorHandler,
    dependencies: []
});
