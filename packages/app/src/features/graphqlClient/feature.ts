import { createFeature } from "~/di/createFeature.js";
import { GraphQLClient } from "./abstractions.js";
import { FetchGraphQLClient } from "./FetchGraphQLClient.js";

export const GraphQLClientFeature = createFeature({
    name: "GraphQLClient",
    register(container) {
        container.register(FetchGraphQLClient).inSingletonScope();
    },
    resolve(container) {
        return container.resolve(GraphQLClient);
    }
});
