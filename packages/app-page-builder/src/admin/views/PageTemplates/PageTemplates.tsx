import React, { useCallback } from "react";
import { i18n } from "@webiny/app/i18n/index.js";
import { useRouter } from "@webiny/react-router";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog.js";
import { useStateWithCallback } from "@webiny/app-admin/hooks/index.js";
import PageTemplatesDataList from "./PageTemplatesDataList.js";
import { PageTemplateDetails } from "./PageTemplateDetails.js";
import { CreatePageTemplateDialog } from "./CreatePageTemplateDialog.js";
import { PbPageTemplate } from "~/types.js";
import { useTemplatesPermissions } from "~/hooks/permissions/index.js";
import { useCreatePageTemplate, useDeletePageTemplate } from "~/features/index.js";

const t = i18n.ns("app-page-builder/admin/views/page-templates");

export interface CreatableItem {
    createdBy?: {
        id?: string;
    };
}

const PageTemplates = () => {
    const { history } = useRouter();
    const { showSnackbar } = useSnackbar();
    const { showConfirmation } = useConfirmationDialog();
    const { createPageTemplate } = useCreatePageTemplate();
    const { deletePageTemplate } = useDeletePageTemplate();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useStateWithCallback<boolean>(false);

    const { canCreate, canUpdate, canDelete } = useTemplatesPermissions();

    const onCreatePageTemplate = async (
        formData: Pick<PbPageTemplate, "title" | "slug" | "description">
    ) => {
        try {
            const pageTemplate = await createPageTemplate({
                title: formData.title,
                slug: formData.slug,
                description: formData.description,
                tags: [],
                layout: "static"
            });

            setIsCreateDialogOpen(false, () => {
                history.push(`/page-builder/template-editor/${pageTemplate.id}`);
            });
        } catch (error) {
            showSnackbar(error.message);
        }
    };

    const handleDeleteTemplateClick = useCallback((item: PbPageTemplate) => {
        showConfirmation(async () => {
            try {
                await deletePageTemplate(item.id);
                history.push("/page-builder/page-templates");
                showSnackbar(
                    t`Template "{title}" was deleted successfully!`({ title: item.title })
                );
            } catch (error) {
                showSnackbar(error.message);
            }
        });
    }, []);

    return (
        <>
            <SplitView>
                <LeftPanel>
                    <PageTemplatesDataList
                        canCreate={canCreate()}
                        canEdit={record => canUpdate(record.createdBy?.id)}
                        canDelete={record => canDelete(record.createdBy?.id)}
                        onCreate={() => setIsCreateDialogOpen(true)}
                        onDelete={handleDeleteTemplateClick}
                    />
                </LeftPanel>
                <RightPanel>
                    <PageTemplateDetails
                        canCreate={canCreate()}
                        canEdit={record => canUpdate(record.createdBy?.id)}
                        canDelete={record => canDelete(record.createdBy?.id)}
                        onCreate={() => setIsCreateDialogOpen(true)}
                        onDelete={handleDeleteTemplateClick}
                    />
                </RightPanel>
            </SplitView>
            <CreatePageTemplateDialog
                open={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onSubmit={onCreatePageTemplate}
            />
        </>
    );
};

export default PageTemplates;
