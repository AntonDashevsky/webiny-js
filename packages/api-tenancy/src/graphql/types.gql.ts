import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins/index.js";
import { TenancyContext } from "~/types.js";

export default new GraphQLSchemaPlugin<TenancyContext>({
    typeDefs: /* GraphQL */ `
        type Tenant {
            id: ID!
            name: String!
            description: String!
            parent: ID
            tags: [String!]!
            settings: TenantSettings!
        }

        type TenantDomain {
            fqdn: String!
        }

        type TenantSettings {
            domains: [TenantDomain!]!
        }
    `
});
