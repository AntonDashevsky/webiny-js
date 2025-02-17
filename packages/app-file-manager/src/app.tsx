import React from "react";
import { SettingsModule } from "~/modules/Settings/index.js";
import { FileManagerApiProviderModule } from "~/modules/FileManagerApiProvider/index.js";
import { FileManagerRendererModule } from "~/modules/FileManagerRenderer/index.js";
import { HeadlessCmsModule } from "~/modules/HeadlessCms/index.js";

export const FileManager = () => {
    return (
        <>
            <SettingsModule />
            <FileManagerApiProviderModule />
            <FileManagerRendererModule />
            <HeadlessCmsModule />
        </>
    );
};
