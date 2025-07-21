import { renderFields } from "@webiny/api-headless-cms/utils/renderFields";
import { renderInputFields } from "@webiny/api-headless-cms/utils/renderInputFields";
import { renderListFilterFields } from "@webiny/api-headless-cms/utils/renderListFilterFields";
import { renderSortEnum } from "@webiny/api-headless-cms/utils/renderSortEnum";
import { GetSettings, SaveSettings } from "@webiny/api-admin-settings";
import {
    ErrorResponse,
    GraphQLSchemaPlugin,
    ListResponse,
    NotFoundError,
    Response
} from "@webiny/handler-graphql";
import { ensureAuthentication } from "~/utils/ensureAuthentication";
import { resolve } from "~/utils/resolve";
import { PAGE_MODEL_ID } from "~/page/page.model";
import type { CmsFieldTypePlugins, CmsModel, CmsModelField } from "@webiny/api-headless-cms/types";
import type { WebsiteBuilderContext } from "~/types";
import { ENTRY_META_FIELDS, isDateTimeEntryMetaField } from "@webiny/api-headless-cms/constants";
import { WEBSITE_BUILDER_INTEGRATIONS, WEBSITE_BUILDER_SETTINGS } from "~/constants";

export interface CreatePageTypeDefsParams {
    model: CmsModel;
    models: CmsModel[];
    plugins: CmsFieldTypePlugins;
}

const removeFieldRequiredValidation = (field: CmsModelField) => {
    if (field.validation) {
        field.validation = field.validation.filter(validation => validation.name !== "required");
    }
    if (field.listValidation) {
        field.listValidation = field.listValidation.filter(v => v.name !== "required");
    }
    return field;
};

const createUpdateFields = (fields: CmsModelField[]): CmsModelField[] => {
    return fields.reduce<CmsModelField[]>((collection, field) => {
        collection.push(removeFieldRequiredValidation({ ...field }));
        return collection;
    }, []);
};

export const createPageTypeDefs = (params: CreatePageTypeDefsParams): string => {
    const { model, models, plugins: fieldTypePlugins } = params;
    const { fields } = model;

    const fieldTypes = renderFields({
        models,
        model,
        fields,
        type: "manage",
        fieldTypePlugins
    });

    const inputCreateFields = renderInputFields({
        models,
        model,
        fields,
        fieldTypePlugins
    });

    const inputUpdateFields = renderInputFields({
        models,
        model,
        fields: createUpdateFields(fields),
        fieldTypePlugins
    });

    const listFilterFieldsRender = renderListFilterFields({
        model,
        fields: model.fields,
        type: "manage",
        fieldTypePlugins
    });

    const onByMetaGqlFields = ENTRY_META_FIELDS.map(field => {
        const fieldType = isDateTimeEntryMetaField(field) ? "DateTime" : "WbIdentity";

        return `${field}: ${fieldType}`;
    }).join("\n");

    const sortEnumRender = renderSortEnum({
        model,
        fields: model.fields,
        fieldTypePlugins
    });

    return /* GraphQL */ `
        ${fieldTypes.map(f => f.typeDefs).join("\n")}

        type WbPage {
            id: ID!
            pageId: String!
            wbyAco_location: WbLocation
            status: String!
            version: Number!
            locked: Boolean!
        ${onByMetaGqlFields}
        ${fieldTypes.map(f => f.fields).join("\n")}
        }

        ${inputCreateFields.map(f => f.typeDefs).join("\n")}

        input WbPageCreateInput {
            wbyAco_location: WbLocationInput
            ${inputCreateFields.map(f => f.fields).join("\n")}
        }

        input WbPageUpdateInput {
            ${inputUpdateFields.map(f => f.fields).join("\n")}
        }

        input WbPagesListWhereInput {
            wbyAco_location: WbLocationWhereInput
            latest: Boolean
            published: Boolean
            ${listFilterFieldsRender}
            AND: [WbPagesListWhereInput!]
            OR: [WbPagesListWhereInput!]
        }

        type WbSettings {
            previewDomain: String!
        }

        type WbPageResponse {
            data: WbPage
            error: WbError
        }

        type WbSettingsResponse {
            data: WbSettings
            error: WbError
        }

        type WbIntegrationsResponse {
            data: JSON!
            error: WbError
        }

        input WbSettingsInput {
            previewDomain: String!
        }
        
        type WbPagesListResponse {
            data: [WbPage]
            error: WbError
            meta: WbMeta
        }

        type WbPageModelResponse {
            data: JSON
            error: WbError
        }
        
        enum WbPageListSorter {
            ${sortEnumRender}
        }
        
                type WbPageRevision {
            id: ID!
            pageId: ID!
            version: Int!
            title: String!
            status: String!
            locked: Boolean!
            savedOn: DateTime!
        }
            
        type WbPageRevisionsResponse {
            data: [WbPageRevision!]
            error: WbError
        }

        extend type WbQuery {
            getPageModel: WbPageModelResponse
            getPageByPath(path: String!): WbPageResponse
            getPageById(id: ID!): WbPageResponse
            getPageRevisions(pageId: ID!): WbPageRevisionsResponse
            listPages(
                where: WbPagesListWhereInput
                limit: Int
                after: String
                sort: [WbPageListSorter]
                search: String
            ): WbPagesListResponse
            getSettings: WbSettingsResponse
            getIntegrations: WbIntegrationsResponse
        }

        extend type WbMutation {
            createPage(data: WbPageCreateInput!): WbPageResponse
            updatePage(id: ID!, data: WbPageUpdateInput!): WbPageResponse
            publishPage(id: ID!): WbPageResponse
            unpublishPage(id: ID!): WbPageResponse
            duplicatePage(id: ID!): WbPageResponse
            movePage(id: ID!, folderId: ID!): WbBooleanResponse
            createPageRevisionFrom(id: ID!): WbPageResponse
            deletePage(id: ID!): WbBooleanResponse
            updateSettings(data: WbSettingsInput!): BooleanResponse
            updateIntegrations(data: JSON!): BooleanResponse
        }
    `;
};

export const createPagesSchema = (params: CreatePageTypeDefsParams) => {
    const pageGraphQL = new GraphQLSchemaPlugin<WebsiteBuilderContext>({
        typeDefs: createPageTypeDefs(params),
        resolvers: {
            WbQuery: {
                getPageModel: async (_, __, context) => {
                    return resolve(() => {
                        ensureAuthentication(context);
                        return context.cms.getModel(PAGE_MODEL_ID);
                    });
                },
                getPageByPath: async (_, { path }, context) => {
                    return resolve(async () => {
                        ensureAuthentication(context);

                        const page = await context.websiteBuilder.page.getByPath(path);

                        if (!page) {
                            throw new NotFoundError(`Page ${path} was not found!`);
                        }

                        return {
                            id: page.id,
                            properties: page.properties,
                            bindings: page.bindings,
                            elements: page.elements
                        };
                    });
                },
                getPageById: async (_, { id }, context) => {
                    return resolve(() => {
                        ensureAuthentication(context);
                        return context.websiteBuilder.page.getById(id);
                    });
                },
                getPageRevisions: async (_, { pageId }, context) => {
                    return resolve(async () => {
                        ensureAuthentication(context);
                        const revisions = await context.websiteBuilder.page.getPageRevisions(
                            pageId
                        );

                        return revisions.map(page => {
                            return {
                                id: page.id,
                                pageId: page.pageId,
                                version: page.version,
                                title: page.properties.title,
                                status: page.status,
                                locked: page.locked,
                                savedOn: page.savedOn
                            };
                        });
                    });
                },
                listPages: async (_, args: any, context) => {
                    try {
                        ensureAuthentication(context);
                        const [entries, meta] = await context.websiteBuilder.page.list(args);
                        return new ListResponse(entries, meta);
                    } catch (e) {
                        return new ErrorResponse(e);
                    }
                },
                getSettings: async (_, args, context) => {
                    ensureAuthentication(context);
                    // TODO: add a GetSettings use case and a Settings domain model with defaults.
                    const getSettings = GetSettings.create(context);
                    const settings = await getSettings.execute(WEBSITE_BUILDER_SETTINGS);
                    const data = settings.getData();

                    return new Response({
                        previewDomain: data.previewDomain ?? "http://localhost:3000"
                    });
                },
                getIntegrations: async (_, args, context) => {
                    ensureAuthentication(context);
                    const getSettings = GetSettings.create(context);
                    const settings = await getSettings.execute(WEBSITE_BUILDER_INTEGRATIONS);
                    return new Response(settings.getData());
                }
            },
            WbMutation: {
                createPage: async (_, { data }, context) => {
                    return resolve(() => {
                        ensureAuthentication(context);
                        return context.websiteBuilder.page.create(data);
                    });
                },
                updatePage: async (_, { id, data }, context) => {
                    return resolve(() => {
                        ensureAuthentication(context);
                        return context.websiteBuilder.page.update(id, data);
                    });
                },
                duplicatePage: async (_, { id }, context) => {
                    return resolve(() => {
                        ensureAuthentication(context);
                        return context.websiteBuilder.page.duplicate({ id });
                    });
                },
                publishPage: async (_, { id }, context) => {
                    return resolve(() => {
                        ensureAuthentication(context);
                        return context.websiteBuilder.page.publish({ id });
                    });
                },
                unpublishPage: async (_, { id }, context) => {
                    return resolve(() => {
                        ensureAuthentication(context);
                        return context.websiteBuilder.page.unpublish({ id });
                    });
                },
                movePage: async (_, { id, folderId }, context) => {
                    ensureAuthentication(context);
                    await context.websiteBuilder.page.move({ id, folderId });
                    return new Response(true);
                },
                createPageRevisionFrom: async (_, { id }, context) => {
                    return resolve(() => {
                        ensureAuthentication(context);
                        return context.websiteBuilder.page.createRevisionFrom({ id });
                    });
                },
                deletePage: async (_, { id }, context) => {
                    ensureAuthentication(context);
                    await context.websiteBuilder.page.delete({ id });
                    return new Response(true);
                },
                updateSettings: async (_, args, context) => {
                    ensureAuthentication(context);
                    const saveSettings = SaveSettings.create(context);
                    await saveSettings.execute({
                        name: WEBSITE_BUILDER_SETTINGS,
                        settings: args.data
                    });
                    return new Response(true);
                },
                updateIntegrations: async (_, args, context) => {
                    ensureAuthentication(context);
                    const saveSettings = SaveSettings.create(context);
                    await saveSettings.execute({
                        name: WEBSITE_BUILDER_INTEGRATIONS,
                        settings: args.data
                    });
                    return new Response(true);
                }
            }
        }
    });

    pageGraphQL.name = "wb.graphql.pages";

    return pageGraphQL;
};
