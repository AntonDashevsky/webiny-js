"use client";
import React, { useEffect } from "react";
import { initContentSdk } from "./initContentSdk";

export const ContentSdkInitializer = React.memo(() => {
    useEffect(() => {
        initContentSdk();
    }, []);

    return null;
});

ContentSdkInitializer.displayName = "ContentSdkInitializer";
