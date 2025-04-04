import React from "react";
import { ReactComponent as DownloadIcon } from "@webiny/icons/file_download.svg";
import { FileManagerViewConfig, useFile } from "~/index";

const { FileDetails } = FileManagerViewConfig;

export const Download = () => {
    const { file } = useFile();

    return (
        <a rel="noreferrer" target={"_blank"} href={`${file.src}?original`}>
            <FileDetails.Action.IconButton
                label={"Download"}
                icon={<DownloadIcon />}
                onAction={() => {
                    /* Do nothing. */
                }}
            />
        </a>
    );
};
