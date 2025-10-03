import { createImplementation } from "@webiny/di-container";
import { GraphQLClient } from "./abstractions.js";
import { EnvConfig } from "~/features/envConfig";

class GraphQLClientImpl implements GraphQLClient.Interface {
    private envConfig: EnvConfig.Interface;

    constructor(envConfig: EnvConfig.Interface) {
        this.envConfig = envConfig;
    }

    async execute<TVariables = any, TResult = any>(
        params: GraphQLClient.Request<TVariables, TResult>
    ): Promise<TResult> {
        const { query, mutation, variables, headers = {} } = params;

        const body = query
            ? JSON.stringify({ query, variables })
            : JSON.stringify({ mutation, variables });

        return this.fetch<TResult>(body, headers);
    }

    private async fetch<TResult = any>(body: string, headers: Record<string, any>) {
        let response: Response;
        try {
            response = await fetch(this.envConfig.get("graphqlApiUrl"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(headers || {})
                },
                body
            });
        } catch (err) {
            throw new Error(`Network error: ${(err as Error).message}`);
        }
        let json: any;
        try {
            json = await response.json();
        } catch (err) {
            throw new Error("Failed to parse GraphQL response as JSON.");
        }
        if (json.errors && json.errors.length > 0) {
            throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
        }
        return json.data as TResult;
    }
}

export const FetchGraphQLClient = createImplementation({
    abstraction: GraphQLClient,
    implementation: GraphQLClientImpl,
    dependencies: [EnvConfig]
});
