import React, { useCallback, useState } from "react";
import slugify from "slugify";
import { Grid, Input } from "@webiny/admin-ui";
import { useDialogs, useSnackbar } from "@webiny/app-admin";
import { Bind, GenericFormData, useForm } from "@webiny/form";
import { validation } from "@webiny/validation";
import { Extensions, FolderTree } from "~/components";
import { useCreateFolder } from "~/features";
import { ROOT_FOLDER } from "~/constants";
import { FolderItem } from "~/types";
import { ParentFolderField } from "./ParentFolderField";

interface ShowDialogParams {
    currentParentId?: string | null;
}

interface UseCreateDialogResponse {
    showDialog: (params?: ShowDialogParams) => void;
}

interface FormComponentProps {
    currentParentId?: string | null;
}

const FormComponent = ({ currentParentId = null }: FormComponentProps) => {
    const [parentId, setParentId] = useState<string | null>(currentParentId);
    const form = useForm();

    const generateSlug = () => {
        if (form.data.slug || !form.data.title) {
            return;
        }

        // We want to update slug only when the folder is first being created.
        form.setValue(
            "slug",
            slugify(form.data.title, {
                replacement: "-",
                lower: true,
                remove: /[*#\?<>_\{\}\[\]+~.()'"!:;@]/g,
                trim: false
            })
        );
    };

    return (
        <>
            <Grid>
                <Grid.Column span={12}>
                    <Bind name={"title"} validators={validation.create("required")}>
                        {bind => (
                            <Input
                                {...bind}
                                label={"Title"}
                                onBlur={generateSlug}
                                size={"lg"}
                                required
                                autoFocus={true}
                            />
                        )}
                    </Bind>
                </Grid.Column>
                <Grid.Column span={12}>
                    <Bind name={"slug"} validators={validation.create("required,slug")}>
                        <Input label={"Slug"} size={"lg"} required />
                    </Bind>
                </Grid.Column>
                <Grid.Column span={12}>
                    <ParentFolderField>
                        <Bind name={"parentId"} defaultValue={parentId}>
                            {({ onChange }) => (
                                <FolderTree
                                    focusedFolderId={parentId || ROOT_FOLDER}
                                    onFolderClick={folder => {
                                        setParentId(folder.id);
                                        onChange(folder.id === ROOT_FOLDER ? null : folder.id);
                                    }}
                                />
                            )}
                        </Bind>
                    </ParentFolderField>
                </Grid.Column>
            </Grid>
            <Extensions />
        </>
    );
};

export const useCreateDialog = (): UseCreateDialogResponse => {
    const dialogs = useDialogs();
    const { createFolder } = useCreateFolder();
    const { showSnackbar } = useSnackbar();

    const onAccept = useCallback(async (data: FolderItem) => {
        try {
            await createFolder({
                ...data,
                parentId: data.parentId === ROOT_FOLDER ? null : data.parentId
            });
            showSnackbar("Folder created successfully!");
        } catch (error) {
            showSnackbar(error.message);
        }
    }, []);

    const showDialog = (params?: ShowDialogParams) => {
        const { currentParentId = null } = params ?? {};

        dialogs.showDialog({
            title: "Create a new folder",
            content: <FormComponent currentParentId={currentParentId} />,
            acceptLabel: "Create folder",
            cancelLabel: "Cancel",
            loadingLabel: "Creating folder...",
            /**
             * We need to cast as there are no generics to pass for the onAccept function.
             */
            onAccept: onAccept as (data: GenericFormData) => Promise<void>
        });
    };

    return {
        showDialog
    };
};
