import React, { useCallback, useState } from "react";
import { IconButton } from "@webiny/ui/Button/index.js";
import { Icon } from "@webiny/ui/Icon/index.js";
import { ReactComponent as MoreVerticalIcon } from "~/admin/assets/more_vert.svg";
import { ReactComponent as HomeIcon } from "~/admin/assets/round-home-24px.svg";
import { ReactComponent as GridViewIcon } from "@material-design-icons/svg/outlined/grid_view.svg";
import { ListItemGraphic } from "@webiny/ui/List/index.js";
import { MenuItem, Menu } from "@webiny/ui/Menu/index.js";
import { CreatePageTemplateDialog } from "~/admin/views/PageTemplates/CreatePageTemplateDialog.js";
import { usePageBuilderSettings } from "~/admin/hooks/usePageBuilderSettings/index.js";
import { css } from "emotion";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
import classNames from "classnames";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog.js";
import { plugins } from "@webiny/plugins";
import { PbPageData, PbPageDetailsHeaderRightOptionsMenuItemPlugin, PbPageTemplate } from "~/types.js";
import { SecureView } from "@webiny/app-security";
import { useAdminPageBuilder } from "~/admin/hooks/useAdminPageBuilder.js";
import { useFolders } from "@webiny/app-aco";
import { useTemplatesPermissions } from "~/hooks/permissions/index.js";
import { PreviewPage } from "./PreviewPage.js";
import { DuplicatePage } from "./DuplicatePage/index.js";
import { useCreatePageTemplateFromPage } from "~/features/index.js";

const menuStyles = css({
    width: 250,
    right: -105,
    left: "auto !important",
    ".disabled": {
        opacity: 0.5,
        pointerEvents: "none"
    }
});

interface PageOptionsMenuProps {
    page: PbPageData;
}

const PageOptionsMenu = (props: PageOptionsMenuProps) => {
    const { page } = props;
    const [isCreateTemplateDialogOpen, setIsCreateTemplateDialogOpen] = useState<boolean>(false);
    const { settings, isSpecialPage, updateSettingsMutation } = usePageBuilderSettings();
    const { createPageTemplateFromPage } = useCreatePageTemplateFromPage();

    const pageBuilder = useAdminPageBuilder();

    const { showSnackbar } = useSnackbar();
    const { showConfirmation } = useConfirmationDialog({
        title: "Set as homepage",
        message: (
            <span>
                You&#39;re about to set the <strong>{page.title}</strong> page as your new homepage,
                are you sure you want to continue?{" "}
                {page.status !== "published" &&
                    "Note that your page will be automatically published."}
            </span>
        )
    });

    const handleCreateTemplateClick = useCallback(
        async (formData: Pick<PbPageTemplate, "title" | "slug" | "description">) => {
            try {
                const pageTemplate = await createPageTemplateFromPage(page.id, formData);

                setIsCreateTemplateDialogOpen(false);
                showSnackbar(`Template "${pageTemplate.title}" created successfully.`);
            } catch (error) {
                showSnackbar(error.message);
            }
        },
        [page]
    );

    const { folderLevelPermissions: flp } = useFolders();
    const { canCreate: templatesCanCreate } = useTemplatesPermissions();

    const canCreateTemplate = templatesCanCreate();

    const folderId = page.wbyAco_location?.folderId;
    const flpCanManageContent = flp.canManageContent(folderId);

    const isTemplatePage = page.content?.data?.template;
    return (
        <Menu
            className={menuStyles}
            handle={
                <IconButton
                    data-testid="pb-page-details-header-page-options-menu"
                    icon={<MoreVerticalIcon />}
                />
            }
        >
            <PreviewPage />

            {flpCanManageContent && (
                <>
                    <SecureView permission={"pb.settings"}>
                        <MenuItem
                            className={classNames({ disabled: isSpecialPage(page.pid, "home") })}
                            onClick={() => {
                                showConfirmation(async () => {
                                    if (!page.locked) {
                                        const response = await pageBuilder.publishPage(page, {
                                            client: pageBuilder.client
                                        });
                                        /**
                                         * In case of exit in "publishPage" lifecycle, "publishPage" hook will return undefined,
                                         * indicating an immediate exit.
                                         */
                                        if (!response) {
                                            return;
                                        }
                                        const { error } = response;
                                        if (error) {
                                            return showSnackbar(error.message);
                                        }
                                    }

                                    const [updateSettings] = updateSettingsMutation;
                                    const response = await updateSettings({
                                        variables: {
                                            data: {
                                                pages: {
                                                    ...settings.pages,
                                                    home: page.id
                                                }
                                            }
                                        }
                                    });

                                    const { error } = response.data.pageBuilder.updateSettings;
                                    if (error) {
                                        showSnackbar(error.message);
                                    } else {
                                        showSnackbar("Homepage set successfully!");
                                    }
                                });
                            }}
                        >
                            <ListItemGraphic>
                                <Icon icon={<HomeIcon />} />
                            </ListItemGraphic>
                            Set as homepage
                        </MenuItem>
                    </SecureView>

                    <DuplicatePage />

                    {canCreateTemplate && !isTemplatePage && (
                        <MenuItem onClick={() => setIsCreateTemplateDialogOpen(true)}>
                            <ListItemGraphic>
                                <Icon icon={<GridViewIcon />} />
                            </ListItemGraphic>
                            Save as a template
                        </MenuItem>
                    )}

                    <CreatePageTemplateDialog
                        open={isCreateTemplateDialogOpen}
                        onClose={() => setIsCreateTemplateDialogOpen(false)}
                        onSubmit={handleCreateTemplateClick}
                    />
                </>
            )}

            {plugins
                .byType<PbPageDetailsHeaderRightOptionsMenuItemPlugin>(
                    "pb-page-details-header-right-options-menu-item"
                )
                .map(plugin => (
                    <React.Fragment key={plugin.name}>{plugin.render(props)}</React.Fragment>
                ))}
        </Menu>
    );
};

export default PageOptionsMenu;
