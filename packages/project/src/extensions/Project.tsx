import React from "react";
import {
    AdminBeforeBuild,
    AdminBeforeWatch,
    BeforeBuild,
    BeforeWatch
} from "~/extensions/index.js";
import { createPathResolver } from "~/utils/createPathResolver.js";

const p = createPathResolver(import.meta.dirname);

export const Project = () => {
    return (
        <>
            <AdminBeforeBuild src={p("Project/SetAdminAppEnvVarsBeforeBuild.js")} />
            <AdminBeforeWatch src={p("Project/SetAdminAppEnvVarsBeforeWatch.js")} />
            <BeforeBuild src={p("Project/WcpSetEnvVarsBeforeBuild.js")} />
            <BeforeWatch src={p("Project/WcpSetEnvVarsBeforeWatch.js")} />
        </>
    );
};
