import React from "react";
import { AdminBeforeBuild, AdminBeforeWatch } from "~/extensions/index.js";
import { createPathResolver } from "~/utils/createPathResolver.js";

const p = createPathResolver(import.meta.dirname);

export const Project = () => {
    return (
        <>
            <AdminBeforeBuild src={p("Project/AssignAdminAppEnvVarsBeforeBuild.js")} />
            <AdminBeforeWatch src={p("Project/AssignAdminAppEnvVarsBeforeWatch.js")} />
        </>
    );
};
