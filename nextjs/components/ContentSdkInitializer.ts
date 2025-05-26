"use client";
import React from "react";
import { contentSdk } from "@webiny/app-website-builder/react/index.js";

export const ContentSdkInitializer = React.memo(() => {
    contentSdk.init({
        apiKey: "123"
    });

    const registerComponentGroups = () => {
        if (!contentSdk.preview) {
            return;
        }

        contentSdk.preview.registerComponentGroup({
            name: "Layout",
            items: [
                {
                    name: "Webiny/Text"
                },
                {
                    name: "Webiny/BlockRef"
                }
            ]
        });

        contentSdk.preview.registerComponentGroup({
            name: "Custom",
            items: [
                {
                    name: "Custom/Hero-1"
                },
                {
                    name: "Custom/Sales-1"
                }
            ]
        });
    };

    registerComponentGroups();

    return null;
});
