import { createImplementation } from "@webiny/di-container";
import { GracefulErrorHandler } from "~/abstractions/index.js";

const MATCH_STRING = "ConditionalCheckFailedException: The conditional request failed";

export class DdbPutItemConditionalCheckFailed implements GracefulErrorHandler.Interface {
    execute(error: Error) {
        const { message } = error;

        if (message.includes(MATCH_STRING)) {
            return {
                message: `Looks like the deployment failed because Pulumi tried to insert a record into a DynamoDB table, but the record already exists. The easiest way to resolve this is to delete the record from the table and try again.`,
                learnMore: "https://webiny.link/deployment-ddb-conditional-check-failed"
            };
        }
        return undefined;
    }
}

export const ddbPutItemConditionalCheckFailed = createImplementation({
    abstraction: GracefulErrorHandler,
    implementation: DdbPutItemConditionalCheckFailed,
    dependencies: []
});
