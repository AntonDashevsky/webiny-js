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
import type { WebsiteBuilderContext } from "~/types";
import { WEBSITE_BUILDER_INTEGRATIONS, WEBSITE_BUILDER_SETTINGS } from "~/constants";
import { pageTypeDefs } from "~/page/page.typeDefs";

export const createPagesSchema = () => {
    const pageGraphQL = new GraphQLSchemaPlugin<WebsiteBuilderContext>({
        typeDefs: pageTypeDefs,
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
                getPageRevisions: async (_, { entryId }, context) => {
                    return resolve(async () => {
                        ensureAuthentication(context);
                        const revisions = await context.websiteBuilder.page.getPageRevisions(
                            entryId
                        );

                        return revisions.map(page => {
                            return {
                                id: page.id,
                                entryId: page.entryId,
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
                    const getSettings = GetSettings.create(context);
                    const settings = await getSettings.execute(WEBSITE_BUILDER_SETTINGS);
                    const data = settings.getData();

                    return new Response({
                        // TODO: add a GetSettings use case and a Settings domain model with defaults.
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
