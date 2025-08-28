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
            <ProjectDecorator src={src("BuildAppWorkspaceDecorator.ts")} />
            <AdminAfterDeploy src={src("UploadAdminAppToS3.ts")} />
            <ExtensionDefinitions src={src("definitions.ts")} />
        </>
    );
};
