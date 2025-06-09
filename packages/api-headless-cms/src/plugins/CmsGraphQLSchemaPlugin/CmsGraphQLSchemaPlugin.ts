import {
    GraphQLSchemaPlugin,
    type GraphQLSchemaPluginConfig as BaseGraphQLSchemaPluginConfig,
    type IGraphQLSchemaPlugin
} from "@webiny/handler-graphql";
import { type CmsContext } from "~/types/index.js";

export type ICmsGraphQLSchemaPlugin<T extends CmsContext = CmsContext> = IGraphQLSchemaPlugin<T>;

export type CmsGraphQLSchemaPluginConfig<T extends CmsContext = CmsContext> =
    BaseGraphQLSchemaPluginConfig<T>;

export class CmsGraphQLSchemaPlugin<T extends CmsContext = CmsContext>
    extends GraphQLSchemaPlugin<T>
    implements ICmsGraphQLSchemaPlugin<T>
{
    public static override readonly type = "cms.graphql.schema";
}

export const createCmsGraphQLSchemaPlugin = <T extends CmsContext = CmsContext>(
    config: CmsGraphQLSchemaPluginConfig<T>
): ICmsGraphQLSchemaPlugin<T> => {
    return new CmsGraphQLSchemaPlugin(config);
};
