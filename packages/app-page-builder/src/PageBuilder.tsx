import React, { Fragment, useMemo } from "react";
import { HasPermission } from "@webiny/app-security";
import { Plugins, AddMenu as Menu, createProviderPlugin } from "@webiny/app-admin";
import { Global, css } from "@emotion/react";
import { PageBuilderProvider as ContextProvider } from "./contexts/PageBuilder/index.js";
import { ReactComponent as PagesIcon } from "./admin/assets/table_chart-24px.svg";
import { WebsiteSettings } from "./modules/WebsiteSettings/WebsiteSettings.js";
import { AdminPageBuilderContextProvider } from "~/admin/contexts/AdminPageBuilder.js";
import { DefaultOnPagePublish } from "~/admin/plugins/pageDetails/pageRevisions/DefaultOnPagePublish.js";
import { DefaultOnPageUnpublish } from "~/admin/plugins/pageDetails/pageRevisions/DefaultOnPageUnpublish.js";
import { DefaultOnPageDelete } from "~/admin/plugins/pageDetails/pageRevisions/DefaultOnPageDelete.js";
import { type EditorProps, EditorRenderer } from "./admin/components/Editor.js";
import { PagesModule } from "~/admin/views/Pages/PagesModule.js";
import { AddButtonLinkComponent } from "~/elementDecorators/AddButtonLinkComponent.js";
import { AddButtonClickHandlers } from "~/elementDecorators/AddButtonClickHandlers.js";
import { InjectElementVariables } from "~/render/variables/InjectElementVariables.js";
import { LexicalParagraphRenderer } from "~/render/plugins/elements/paragraph/LexicalParagraph.js";
import { LexicalHeadingRenderer } from "~/render/plugins/elements/heading/LexicalHeading.js";
import { NullLoaderCache } from "@webiny/app-page-builder-elements/hooks/useLoader/NullLoaderCache.js";
import { ConvertIconSettings as EditorConvertIconSettings } from "~/editor/prepareEditorContent/ConvertIconSettings.js";
import { ConvertIconSettings as RendererConvertIconSettings } from "~/render/plugins/elementSettings/icon/index.js";
import { AddImageLinkComponent } from "~/elementDecorators/AddImageLinkComponent.js";
import { PageTemplatesPreview } from "./dataInjection/preview/PageTemplatesPreview.js";
import { PagesPreview } from "~/dataInjection/preview/PagesPreview.js";
import { IfDynamicPagesEnabled } from "~/IfDynamicPagesEnabled.js";

export type { EditorProps };
export { EditorRenderer };
export * from "~/admin/config/pages/index.js";
export * from "~/admin/views/Pages/hooks/index.js";

const PageBuilderProviderPlugin = createProviderPlugin(Component => {
    return function PageBuilderProvider({ children }) {
        const noLoaderCache = useMemo(() => {
            return new NullLoaderCache();
        }, []);

        return (
            <ContextProvider loaderCache={noLoaderCache}>
                <AdminPageBuilderContextProvider>
                    <Component>{children}</Component>
                </AdminPageBuilderContextProvider>
            </ContextProvider>
        );
    };
});

const PageBuilderMenu = () => {
    return (
        <>
            <HasPermission any={["pb.menu", "pb.category", "pb.page", "pb.template", "pb.block"]}>
                <Menu name="pageBuilder" label={"Page Builder"} icon={<PagesIcon />}>
                    <Menu name="pageBuilder.pages" label={"Pages"}>
                        <HasPermission name={"pb.category"}>
                            <Menu
                                name="pageBuilder.pages.categories"
                                label={"Categories"}
                                path="/page-builder/categories"
                            />
                        </HasPermission>
                        <HasPermission name={"pb.page"}>
                            <Menu
                                name="pageBuilder.pages.pages"
                                label={"Pages"}
                                path="/page-builder/pages"
                            />
                        </HasPermission>
                        <HasPermission name={"pb.template"}>
                            <Menu
                                name="pageBuilder.pages.pageTemplates"
                                label={"Templates"}
                                path="/page-builder/page-templates"
                            />
                        </HasPermission>
                        <HasPermission name={"pb.menu"}>
                            <Menu
                                name="pageBuilder.pages.menus"
                                label={"Menus"}
                                path="/page-builder/menus"
                            />
                        </HasPermission>
                    </Menu>
                    <Menu name="pageBuilder.blocks" label={"Blocks"}>
                        <HasPermission name={"pb.block"}>
                            <Menu
                                name="pageBuilder.blocks.categories"
                                label={"Categories"}
                                path="/page-builder/block-categories"
                            />
                            <Menu
                                name="pageBuilder.blocks.pageBlocks"
                                label={"Blocks"}
                                path="/page-builder/page-blocks"
                            />
                        </HasPermission>
                    </Menu>
                </Menu>
            </HasPermission>
            <HasPermission name={"pb.settings"}>
                <Menu name={"settings"}>
                    <Menu name={"settings.pageBuilder"} label={"Page Builder"}>
                        <Menu
                            name={"settings.pageBuilder.website"}
                            label={"Website"}
                            path={"/settings/page-builder/website"}
                        />
                    </Menu>
                </Menu>
            </HasPermission>
        </>
    );
};

const EditorLoader = React.lazy(() =>
    import(
        /* webpackChunkName: "PageBuilderEditor" */
        "./editor/Editor.js"
    ).then(m => ({
        default: m.Editor
    }))
);

const EditorRendererPlugin = EditorRenderer.createDecorator(() => {
    return function Editor(props) {
        return <EditorLoader {...props} />;
    };
});

const displayContents = css`
    pb-editor-ui-elements,
    pb-editor-ui-element {
        display: contents;
    }
`;

export const PageBuilder = () => {
    return (
        <Fragment>
            <Global styles={displayContents} />
            <PagesModule />
            <PageBuilderProviderPlugin />
            <EditorRendererPlugin />
            <Plugins>
                <PageBuilderMenu />
                <WebsiteSettings />
                <DefaultOnPagePublish />
                <DefaultOnPageUnpublish />
                <DefaultOnPageDelete />
            </Plugins>
            {/* Element renderer plugins. */}
            <LexicalParagraphRenderer />
            <LexicalHeadingRenderer />
            <AddButtonLinkComponent />
            <AddButtonClickHandlers />
            <AddImageLinkComponent />
            <InjectElementVariables />
            {/* Ensure data is in the correct shape when editor is mounting. */}
            {/* This works only within the block/template/page editor. */}
            <EditorConvertIconSettings />
            {/* Ensure each element renderer is receiving data in the correct shape.  */}
            {/* This works for page previews, block previews, etc. */}
            <RendererConvertIconSettings />
            <IfDynamicPagesEnabled>
                {/* Decorate page template content preview. */}
                <PageTemplatesPreview />
                {/* Decorate page content preview. */}
                <PagesPreview />
            </IfDynamicPagesEnabled>
        </Fragment>
    );
};
