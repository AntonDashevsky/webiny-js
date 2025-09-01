import {
    AdminAfterDeploy,
    ExtensionDefinitions,
    BeforeBuild
} from "@webiny/project/extensions/index.js";
import path from "path";
import React from "react";

const src = (src: string) => path.join(import.meta.dirname, "Webiny", src);

export const Webiny = () => {
    return (
        <>
            <BeforeBuild src={src("BuildAppWorkspace.js")} />
            <AdminAfterDeploy src={src("UploadAdminAppToS3.js")} />
            <ExtensionDefinitions src={src("definitions.js")} />
        </>
    );
};
