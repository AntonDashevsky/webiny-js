"use client";
import React from "react";
import { initContentSdk } from "@components/initContentSdk";

export const ContentSdkInitializer = React.memo(() => {
    initContentSdk();

    return null;
});

ContentSdkInitializer.displayName = "ContentSdkInitializer";
