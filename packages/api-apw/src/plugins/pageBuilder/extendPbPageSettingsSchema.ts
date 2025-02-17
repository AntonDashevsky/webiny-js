import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins/index.js";
import { ApwContext } from "~/types.js";

export const extendPbPageSettingsSchema = () =>
    new GraphQLSchemaPlugin<ApwContext>({
        typeDefs: /* GraphQL */ `
            type PbApwPageSettings {
                workflowId: ID
                contentReviewId: ID
            }

            extend type PbPageSettings {
                apw: PbApwPageSettings
            }
        `
    });
