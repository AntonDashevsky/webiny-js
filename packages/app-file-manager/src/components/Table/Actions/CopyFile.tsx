import React from "react";
import { ReactComponent as Copy } from "@webiny/icons/content_copy.svg";
import { FileManagerViewConfig } from "~/modules/FileManagerRenderer/FileManagerView/FileManagerViewConfig.js";
import { useCopyFile } from "~/hooks/useCopyFile.js";
import { useFile } from "~/hooks/useFile.js";

export const CopyFile = () => {
    const { file } = useFile();
    const { copyFileUrl } = useCopyFile({ file });
    const { OptionsMenuItem } = FileManagerViewConfig.Browser.FileAction;

    return (
        <OptionsMenuItem
            icon={<Copy />}
            label={"Copy"}
            onAction={copyFileUrl}
            data-testid={"aco.actions.file.copy"}
        />
    );
};
