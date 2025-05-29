"use client";
import React from "react";
import { contentSdk, registerComponentGroup } from "@webiny/app-website-builder/react/index.js";
import { ComponentManifest } from "@webiny/app-website-builder/sdk/types";

export const ContentSdkInitializer = React.memo(() => {
    contentSdk.init({
        apiKey: "123"
    });

    registerComponentGroup({
        name: "basic",
        label: "Basic"
    });

    registerComponentGroup({
        name: "ecommerce",
        label: "eCommerce"
    });

    registerComponentGroup({
        name: "custom",
        label: "Custom",
        filter: (component: ComponentManifest) => !component.group
    });

    return null;
});

ContentSdkInitializer.displayName = "ContentSdkInitializer";
