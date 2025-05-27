"use client";
import React from "react";
import { contentSdk } from "@webiny/app-website-builder/react/index.js";
import { ComponentManifest } from "@webiny/app-website-builder/sdk/types";

export const ContentSdkInitializer = React.memo(() => {
    contentSdk.init({
        apiKey: "123"
    });

    const registerComponentGroups = () => {
        if (!contentSdk.preview) {
            return;
        }

        contentSdk.preview.registerComponentGroup({
            name: "basic",
            label: "Basic"
        });

        contentSdk.preview.registerComponentGroup({
            name: "ecommerce",
            label: "eCommerce"
        });

        contentSdk.preview.registerComponentGroup({
            name: "custom",
            label: "Custom",
            filter: (component: ComponentManifest) => !component.group
        });
    };

    registerComponentGroups();

    return null;
});
