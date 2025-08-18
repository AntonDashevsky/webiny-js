import React from "react";
import {
    CoreAppTemplate,
    ApiAppTemplate,
    AdminAppTemplate,
    WebsiteAppTemplate
} from "./appTemplates/index.js";

export const Webiny = () => {
    return (
        <>
            <CoreAppTemplate />
            <ApiAppTemplate />
            <AdminAppTemplate />
            <WebsiteAppTemplate />
        </>
    );
};
