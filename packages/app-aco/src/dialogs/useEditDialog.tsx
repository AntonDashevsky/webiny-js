import React, { useCallback, useState } from "react";
import { useSnackbar } from "@webiny/app-admin";
import { Bind, GenericFormData } from "@webiny/form";
import { validation } from "@webiny/validation";
import { Cell, Grid } from "@webiny/ui/Grid/index.js";
import { Input } from "@webiny/ui/Input/index.js";
import { Typography } from "@webiny/ui/Typography/index.js";

import { FolderTree } from "~/components/index.js";
import { ROOT_FOLDER } from "~/constants.js";
import { useDialogs } from "@webiny/app-admin";
import { DialogFoldersContainer } from "~/dialogs/styled.js";
import { useFolders } from "~/hooks/index.js";
import { FolderItem } from "~/types.js";

interface ShowDialogParams {
    folder: FolderItem;
}

interface UseEditDialogResponse {
    showDialog: (params: ShowDialogParams) => void;
}

interface FormComponentProps {
    folder: FolderItem;
}

const FormComponent = ({ folder }: FormComponentProps) => {
    const [parentId, setParentId] = useState<string | null>(folder.parentId);

    return (
        <Grid>
            <Cell span={12}>
                <Bind
                    name={"title"}
                    defaultValue={folder.title}
                    validators={[validation.create("required")]}
                >
                    <Input label={"Title"} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind
                    name={"slug"}
                    defaultValue={folder.slug}
                    validators={[validation.create("required,slug")]}
                >
                    <Input label={"Slug"} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Typography use="body1">{"Parent folder"}</Typography>
                <DialogFoldersContainer>
                    <Bind name={"parentId"} defaultValue={parentId}>
                        {({ onChange }) => (
                            <FolderTree
                                focusedFolderId={parentId || ROOT_FOLDER}
                                hiddenFolderIds={[folder.id]}
                                onFolderClick={folder => {
                                    setParentId(folder.id);
                                    onChange(folder.id === ROOT_FOLDER ? null : folder.id);
                                }}
                                enableCreate={true}
                            />
                        )}
                    </Bind>
                </DialogFoldersContainer>
            </Cell>
        </Grid>
    );
};

export const useEditDialog = (): UseEditDialogResponse => {
    const dialog = useDialogs();
    const { updateFolder } = useFolders();
    const { showSnackbar } = useSnackbar();

    const onAccept = useCallback(async (folder: FolderItem, data: GenericFormData) => {
        try {
            const result = await updateFolder({
                ...folder,
                ...data
            });

            if (result) {
                showSnackbar(`The folder "${result.title}" was updated successfully!`);
            } else {
                throw new Error(`Error while updating folder "${folder.title}"!`);
            }
        } catch (error) {
            showSnackbar(error.message);
        }
    }, []);

    const showDialog = ({ folder }: ShowDialogParams) => {
        dialog.showDialog({
            title: "Edit folder",
            content: <FormComponent folder={folder} />,
            acceptLabel: "Edit folder",
            cancelLabel: "Cancel",
            loadingLabel: "Editing folder...",
            onAccept: (data: GenericFormData) => onAccept(folder, data)
        });
    };

    return {
        showDialog
    };
};
