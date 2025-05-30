"use client";
import React, { useEffect, useState } from "react";
import { PageRenderer, contentSdk } from "@webiny/app-website-builder/react/index";
import { PageLayout } from "@components/PageLayout";
import { customComponents } from "@components/customComponents";

export function PageContent({ path, initialData }: { path: string; initialData: any }) {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        (async () => {
            if (!data) {
                const page = await contentSdk.getPage(path);
                if (page) {
                    setData(page);
                }
            }
        })();
    }, []);

    return (
        <PageLayout>
            <PageRenderer page={data} components={customComponents} />
        </PageLayout>
    );
}
