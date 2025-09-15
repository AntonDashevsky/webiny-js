import React from "react";
import {
    AdminAfterDeploy,
    ExtensionDefinitions,
    BeforeBuild,
    ApiAfterDeploy
} from "@webiny/project/extensions/index.js";
import { createPathResolver } from "@webiny/project";

const p = createPathResolver(import.meta.dirname);

export const Webiny = () => {
    return (
        <>
            <BeforeBuild src={p("Webiny/BuildAppWorkspace.js")} />
            <AdminAfterDeploy src={p("Webiny/UploadAdminAppToS3.js")} />
            <ApiAfterDeploy src={p("Webiny/ExecuteDataMigrations.js")} />
            <ExtensionDefinitions src={p("Webiny/definitions.js")} />
        </>
    );
};
