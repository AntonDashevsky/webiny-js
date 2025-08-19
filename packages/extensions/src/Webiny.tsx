import React from "react";
import { Core } from "~/index";
import path from "path";

export const Webiny = () => {
    return (
        <>
            <Core.BeforeBuild
                src={path.join(import.meta.dirname, "appTemplates/CoreAppTemplate.tsx")}
            />
        </>
    );
};
