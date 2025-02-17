import { ContextPlugin } from "@webiny/api";
import { getAncestorFoldersByPage } from "~/page/getAncestorFoldersByPage.js";
import { createImportExportPageHooks, createPageHooks } from "~/page/hooks/index.js";
import { createPageProcessors } from "~/page/processors/index.js";
import { getSearchablePageContent } from "~/utils/getSearchableContent.js";
import { PageSearchProcessor, PbAcoContext } from "~/types.js";
import { createApp } from "~/app.js";
import { PageBuilderCrudDecorators } from "~/utils/PageBuilderCrudDecorators.js";
import { createPbPageWbyAcoLocationGqlField } from "~/page/graphql/createPbPageWbyAcoLocationGqlField.js";

export * from "./createAppModifier.js";
export * from "./plugins/index.js";

const setupContext = async (context: PbAcoContext): Promise<void> => {
    const pageSearchProcessors: PageSearchProcessor[] = [];

    const app = await context.aco.registerApp(createApp());

    context.pageBuilderAco = {
        app,
        addPageSearchProcessor(processor) {
            pageSearchProcessors.push(processor);
        },
        async getSearchablePageContent(page) {
            return getSearchablePageContent(context, page, pageSearchProcessors);
        },
        async getAncestorFoldersByPage(page) {
            return getAncestorFoldersByPage(context, page);
        }
    };
};

const decoratePageBuilderCrud = async (context: PbAcoContext): Promise<void> => {
    if (context.wcp.canUseFolderLevelPermissions()) {
        new PageBuilderCrudDecorators({ context }).decorate();
    }
};

export const createAcoPageBuilderContext = () => {
    const plugin = new ContextPlugin<PbAcoContext>(async context => {
        if (!context.aco) {
            console.log(
                `There is no ACO initialized so we will not initialize the Page Builder ACO.`
            );
            return;
        }
        await setupContext(context);
        await decoratePageBuilderCrud(context);
        createPageHooks(context);
        createPageProcessors(context);
        createPbPageWbyAcoLocationGqlField(context);
    });

    plugin.name = "page-builder-aco.createContext";

    return plugin;
};

export const createAcoPageBuilderImportExportContext = () => {
    const plugin = new ContextPlugin<PbAcoContext>(async context => {
        if (!context.aco) {
            console.log(
                `There is no ACO initialized so we will not initialize the Page Builder ACO.`
            );
            return;
        }
        await setupContext(context);
        createImportExportPageHooks(context);
        createPageProcessors(context);
    });

    plugin.name = `page-builder-aco.createImportExportContext`;

    return plugin;
};
