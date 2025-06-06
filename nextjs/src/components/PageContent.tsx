"use client";
import React, { useEffect, useState } from "react";
import { contentSdk, PageRenderer } from "@webiny/app-website-builder/react/index";
import { PageLayout } from "@components/PageLayout";
import { customComponents } from "@components/customComponents";

export function PageContent({ path, initialData }: { path: string; initialData: any }) {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        (async () => {
            if (!initialData) {
                const page = await contentSdk.getPage(path);
                if (page) {
                    setData(page);
                }
            }
        })();
    }, [path]);

    return (
        <PageLayout>
            <PageRenderer page={data} components={customComponents} />
        </PageLayout>
    );
}
