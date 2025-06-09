import { type AdminUsersContext } from "@webiny/api-admin-users/types.js";
import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins/GraphQLSchemaPlugin.js";

export default new GraphQLSchemaPlugin<AdminUsersContext>({
    typeDefs: /* GraphQL */ `
        extend input AdminUsersInstallInput {
            firstName: String!
            lastName: String!
            email: String!
            password: String!
        }
    `
});
