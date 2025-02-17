import React from "react";
import { AddBindingContext, InjectDynamicValues } from "~/dataInjection/index.js";

export const WebsiteDataInjection = React.memo(() => {
    return (
        <>
            <AddBindingContext />
            <InjectDynamicValues />
        </>
    );
});

WebsiteDataInjection.displayName = "WebsiteDataInjection";
