import {
    AdminAfterDeploy,
    ExtensionDefinitions,
    ProjectDecorator
} from "@webiny/project/extensions/index.js";
import path from "path";
import React from "react";

const src = (src: string) => path.join(import.meta.dirname, "Webiny", src);

export const Webiny = () => {
    return (
        <>
            <AdminAfterDeploy src={src("UploadAdminAppToS3.js")} />
            <ProjectDecorator src={src("BuildAppWorkspaceDecorator.js")} />
            <ExtensionDefinitions src={src("definitions.js")} />
        </>
    );
};
