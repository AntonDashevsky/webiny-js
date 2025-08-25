import React from "react";
import path from "path";
import { ProjectDecorator, AdminAfterDeploy } from "@webiny/project/extensions/index.js";

const src = (src: string) => path.join(import.meta.dirname, "Webiny", src);

export const Webiny = () => {
    return (
        <>
            <ProjectDecorator src={src("BuildAppWorkspaceDecorator.js")} />
            <AdminAfterDeploy src={src("UploadAdminAppToS3.js")} />
        </>
    );
};
