import React from "react";
import { ReactComponent as Delete } from "@webiny/icons/delete.svg";
import { FileManagerViewConfig } from "~/modules/FileManagerRenderer/FileManagerView/FileManagerViewConfig.js";
import { useFileManagerApi } from "~/modules/FileManagerApiProvider/FileManagerApiContext/index.js";
import { useDeleteFile } from "~/hooks/useDeleteFile.js";
import { useFile } from "~/hooks/useFile.js";

export const DeleteFile = () => {
    const { file } = useFile();
    const { canDelete } = useFileManagerApi();
    const { openDialogDeleteFile } = useDeleteFile({
        file
    });
    const { OptionsMenuItem } = FileManagerViewConfig.Browser.FileAction;

    if (!canDelete(file)) {
        return null;
    }

    return (
        <OptionsMenuItem
            icon={<Delete />}
            label={"Delete"}
            onAction={openDialogDeleteFile}
            data-testid={"aco.actions.file.delete"}
        />
    );
};
