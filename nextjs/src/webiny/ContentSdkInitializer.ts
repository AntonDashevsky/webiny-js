"use client";
import React from "react";
import { initContentSdk } from "./initContentSdk";

export const ContentSdkInitializer = React.memo(() => {
    initContentSdk();

    return null;
});

ContentSdkInitializer.displayName = "ContentSdkInitializer";
