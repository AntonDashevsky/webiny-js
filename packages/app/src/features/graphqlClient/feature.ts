import { GraphQLClient } from "./abstractions.js";
import { FetchGraphQLClient } from "./FetchGraphQLClient.js";
import { createFeature } from "~/shared/di/createFeature.js";

export const GraphQLClientFeature = createFeature({
    name: "GraphQLClient",
    register(container) {
        container.register(FetchGraphQLClient).inSingletonScope();
    },
    resolve(container) {
        return container.resolve(GraphQLClient);
    }
});
