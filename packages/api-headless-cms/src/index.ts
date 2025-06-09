import { createGraphQL as baseCreateGraphQL, type CreateGraphQLParams } from "~/graphql/index.js";
import { createDefaultModelManager } from "~/modelManager/index.js";
import { createGraphQLFields } from "~/graphqlFields/index.js";
import { createValidators } from "~/validators/index.js";
import {
    createContextParameterPlugin,
    createHeaderParameterPlugin,
    createPathParameterPlugin
} from "~/parameters/index.js";
import { createContextPlugin, type CrudParams } from "~/context.js";
import {
    entryFieldFromStorageTransform,
    entryFromStorageTransform,
    entryToStorageTransform
} from "./utils/entryStorage.js";
import { createFieldConverters } from "~/fieldConverters/index.js";
import { createExportGraphQL } from "~/export/index.js";
import { createStorageTransform } from "~/storage/index.js";
import { createLexicalHTMLRenderer } from "./htmlRenderer/createLexicalHTMLRenderer.js";
import { createRevisionIdScalarPlugin } from "~/graphql/scalars/RevisionIdScalarPlugin.js";
import { type Plugin } from "@webiny/plugins/types.js";

export * from "./utils/isHeadlessCmsReady.js";
export * from "./utils/createModelField.js";
export * from "./graphql/schema/resolvers/manage/normalizeGraphQlInput.js";

export type CreateHeadlessCmsGraphQLParams = CreateGraphQLParams;
export const createHeadlessCmsGraphQL = (params: CreateHeadlessCmsGraphQLParams = {}): Plugin[] => {
    return [
        ...createRevisionIdScalarPlugin(),
        /**
         * PathParameter plugins are used to determine the type of the cms endpoint
         */
        createPathParameterPlugin(),
        createHeaderParameterPlugin(),
        createContextParameterPlugin(),
        /**
         * At this point we can create, or not create, CMS GraphQL Schema.
         */
        ...baseCreateGraphQL(params),
        createExportGraphQL(),
        createLexicalHTMLRenderer()
    ];
};

export type ContentContextParams = CrudParams;
export const createHeadlessCmsContext = (params: ContentContextParams) => {
    return [
        /**
         * Context for all Lambdas - everything is loaded now.
         */
        createContextPlugin(params),
        createDefaultModelManager(),
        createGraphQLFields(),
        createFieldConverters(),
        createValidators(),
        ...createStorageTransform()
    ];
};
export * from "~/graphqlFields/index.js";
export * from "~/plugins/index.js";
export * from "~/utils/incrementEntryIdVersion.js";
export * from "~/utils/RichTextRenderer.js";
export * from "./graphql/handleRequest.js";
export * from "./utils/contentEntryTraverser/ContentEntryTraverser.js";
export * from "./utils/contentModelAst/index.js";
export { entryToStorageTransform, entryFieldFromStorageTransform, entryFromStorageTransform };
