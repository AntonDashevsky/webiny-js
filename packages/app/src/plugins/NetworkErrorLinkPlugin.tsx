import React from "react";
import { ApolloLinkPlugin } from "./ApolloLinkPlugin.js";
import { onError } from "apollo-link-error";
import { type ServerError } from "apollo-link-http-common";
import { print } from "graphql/language/index.js";
import createErrorOverlay from "./NetworkErrorLinkPlugin/createErrorOverlay.js";
import { LocalAwsLambdaTimeoutMessage } from "./NetworkErrorLinkPlugin/LocalAwsLambdaTimeoutMessage.js";
import { boolean } from "boolean";
import { config as appConfig } from "~/config.js";
import { ErrorOverlay } from "~/plugins/NetworkErrorLinkPlugin/ErrorOverlay.js";
import { GqlErrorOverlay } from "./NetworkErrorLinkPlugin/GqlErrorOverlay.js";

const isLocalAwsLambdaFnInvocationTimeoutError = (error: any): error is ServerError => {
    return error.result && error.result.code === "LOCAL_AWS_LAMBDA_TIMEOUT";
};

/**
 * This plugin creates an ApolloLink that checks for `NetworkError` and shows an ErrorOverlay in the browser.
 */
export class NetworkErrorLinkPlugin extends ApolloLinkPlugin {
    public override createLink() {
        return onError(({ networkError, operation }) => {
            const debug = appConfig.getKey("DEBUG", boolean(process.env.REACT_APP_DEBUG));

            if (networkError && debug) {
                if (isLocalAwsLambdaFnInvocationTimeoutError(networkError)) {
                    createErrorOverlay({
                        element: (
                            <ErrorOverlay
                                message={<LocalAwsLambdaTimeoutMessage />}
                                closeable={false}
                            />
                        ),
                        closeable: false
                    });
                    return;
                }

                createErrorOverlay({
                    element: (
                        <GqlErrorOverlay
                            query={print(operation.query)}
                            networkError={networkError}
                        />
                    )
                });
            }

            // TODO: also print graphQLErrors
        });
    }
}
