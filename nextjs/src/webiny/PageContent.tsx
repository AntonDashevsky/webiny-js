"use client";
import React, { useEffect, useState } from "react";
import { contentSdk, PageRenderer } from "@webiny/website-builder-react";
import { PageLayout } from "./PageLayout";
import { customComponents } from "./customComponents";

export function PageContent({ path, initialData }: { path: string; initialData: any }) {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        if (contentSdk.isEditing()) {
            contentSdk.getPage(path).then(data => {
                setData(data);
            });
        }
    }, [path]);

    return (
        <PageLayout>
            <PageRenderer page={data} components={customComponents} />
        </PageLayout>
    );
}
