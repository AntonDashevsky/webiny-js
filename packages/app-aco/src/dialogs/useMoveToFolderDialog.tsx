import React, { type ReactNode } from "react";

import { i18n } from "@webiny/app/i18n/index.js";
import { Bind, type GenericFormData } from "@webiny/form";
import { Typography } from "@webiny/ui/Typography/index.js";
import { useDialogs } from "@webiny/app-admin";
import { FolderTree } from "~/components/index.js";
import { DialogFoldersContainer } from "~/dialogs/styled.js";

const t = i18n.ns("app-aco/dialogs/use-move-to-folder-dialog");

interface ShowDialogParams {
    title?: ReactNode;
    message?: ReactNode;
    acceptLabel?: ReactNode;
    cancelLabel?: ReactNode;
    loadingLabel?: ReactNode;
    focusedFolderId: string;
    onAccept: (data: GenericFormData) => void;
    onClose?: () => void;
}

interface UseMoveToFolderDialogResponse {
    showDialog: (params: ShowDialogParams) => void;
}

interface MessageProps {
    helpText: ReactNode;
    focusedFolderId: string;
}

export const Message = ({ helpText, focusedFolderId }: MessageProps) => {
    return (
        <>
            <Typography use="body1">{helpText}</Typography>
            <DialogFoldersContainer>
                <Bind name={"folder"} defaultValue={{ id: focusedFolderId }}>
                    {({ value, onChange }) => (
                        <FolderTree
                            focusedFolderId={value.id}
                            onFolderClick={onChange}
                            enableCreate={true}
                        />
                    )}
                </Bind>
            </DialogFoldersContainer>
        </>
    );
};

export const useMoveToFolderDialog = (): UseMoveToFolderDialogResponse => {
    const dialogs = useDialogs();

    const showDialog = ({
        title = t`Move item`,
        message = t`Are you sure you want to continue?`,
        acceptLabel = t`Move item`,
        cancelLabel = t`Cancel`,
        loadingLabel = t`Moving item`,
        onAccept,
        onClose,
        focusedFolderId
    }: ShowDialogParams) => {
        dialogs.showDialog({
            title,
            content: <Message helpText={message} focusedFolderId={focusedFolderId} />,
            acceptLabel,
            cancelLabel,
            loadingLabel,
            onAccept: (data: GenericFormData) => onAccept(data),
            onClose
        });
    };

    return {
        showDialog
    };
};
