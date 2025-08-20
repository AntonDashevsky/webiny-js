import React from "react";
import path from "path";
import { Project } from "./index.js";

export const Webiny = () => {
    return (
        <>
            <Project.Decorator
                src={path.join(import.meta.dirname, "Webiny/BuildAppWorkspaceDecorator.tsx")}
            />
        </>
    );
};
