import React, { useMemo } from "react";
import { Grid, Select } from "@webiny/admin-ui";
import { useBind } from "@webiny/form";
import { validation } from "@webiny/validation";
import { useDialogs } from "@webiny/app-admin";
import { useCreatePage } from "~/features/pages";
import { CreatePageParams } from "~/features/pages/createPage/ICreatePageUseCase";
import { usePageTypes } from "~/ecommerce/usePageTypes";
import { useGetEditPageUrl } from "~/DocumentList/hooks/useGetEditPageUrl";
import { useRouter } from "@webiny/react-router";

export const useCreatePageDialog = (folderId: string) => {
    const dialog = useDialogs();
    const { createPage } = useCreatePage();
    const { getEditPageUrl } = useGetEditPageUrl();
    const { history } = useRouter();

    const showCreatePageDialog = () => {
        dialog.showDialog({
            title: "Create a Page",
            acceptLabel: "Create",
            cancelLabel: "Cancel",
            content: <CreatePageWizard />,
            formData: {},
            onAccept: async formData => {
                const input: CreatePageParams = {
                    location: {
                        folderId
                    },
                    properties: {
                        title: formData.title,
                        path: formData.path
                    },
                    elements: {
                        root: {
                            type: "Webiny/Element",
                            id: "root",
                            component: {
                                name: "Webiny/Root"
                            }
                        }
                    }
                };

                if (formData.type === "static") {
                    input.metadata = {
                        documentType: "page",
                        pageType: "static"
                    };
                } else {
                    input.metadata = {
                        documentType: "page",
                        pageType: formData.type,
                        resourceType: formData.resourceType,
                        resourceId: formData.resourceId
                    };
                }

                const result = await createPage(input);
                history.push(getEditPageUrl(result.id));
            }
        });
    };

    return { showCreatePageDialog };
};

const CreatePageWizard = () => {
    const { pageTypes } = usePageTypes();

    const options = useMemo(() => {
        return Array.from(pageTypes.entries()).map(([, type]) => ({
            label: type.label,
            value: type.name
        }));
    }, [pageTypes]);

    const pageTypeBind = useBind({
        name: "type",
        validators: [validation.create("required")]
    });

    const pageType = pageTypes.get(pageTypeBind.value);

    return (
        <Grid>
            <Grid.Column span={12}>
                <Select
                    label={"Page Type"}
                    {...pageTypeBind}
                    value={pageTypeBind.value ?? ""}
                    options={options}
                ></Select>
            </Grid.Column>
            <>{pageType ? pageType.element : null}</>
        </Grid>
    );
};
