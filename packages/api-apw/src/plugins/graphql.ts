import workflowSchema from "./graphql/workflow.gql.js";
import contentReviewSchema from "./graphql/contentReview.gql.js";
import reviewerSchema from "./graphql/reviewer.gql.js";
import commentSchema from "./graphql/comment.gql.js";
import changeRequestedSchema from "./graphql/changeRequest.gql.js";
import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins/index.js";
import { ContextPlugin } from "@webiny/api";
import { type ApwContext } from "~/types.js";

const emptyResolver = () => ({});

const baseSchema = new GraphQLSchemaPlugin({
    typeDefs: /* GraphQL */ `
        input ApwRefFieldInput {
            id: ID!
            modelId: String
        }

        input ApwRefFieldWhereInput {
            id: String
            id_not: String
            id_in: [String!]
            id_not_in: [String]
            entryId: String
            entryId_not: String
            entryId_in: [String!]
            entryId_not_in: [String!]
        }

        type ApwRefField {
            modelId: String!
            entryId: ID!
            id: ID!
        }

        type ApwMeta {
            hasMoreItems: Boolean
            totalCount: Int
            cursor: String
        }
        type ApwIdentity {
            id: ID
            displayName: String
            type: String
        }
        type ApwError {
            code: String
            message: String
            data: JSON
            stack: String
        }
        extend type Query {
            apw: ApwQuery
        }
        extend type Mutation {
            apw: ApwMutation
        }
    `,
    resolvers: {
        Query: {
            apw: emptyResolver
        },
        Mutation: {
            apw: emptyResolver
        }
    }
});

export default () => {
    return new ContextPlugin<ApwContext>(context => {
        if (!context.wcp.canUseFeature("advancedPublishingWorkflow")) {
            return;
        }

        context.plugins.register([
            baseSchema,
            workflowSchema,
            contentReviewSchema,
            reviewerSchema,
            commentSchema,
            changeRequestedSchema
        ]);
    });
};
