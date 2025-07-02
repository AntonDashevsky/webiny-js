import React from "react";
import { draftMode } from "next/headers";
import { contentSdk } from "@webiny/website-builder-react";
import { initContentSdk } from "@/webiny/initContentSdk";
import { PageLayout } from "@/webiny/PageLayout";
import { DocumentRenderer } from "@/webiny/DocumentRenderer";

export async function generateStaticParams() {
    initContentSdk();
    const pages = await contentSdk.listPages();

    return pages.map(page => ({ slug: page.properties.path }));
}

async function getPage(path: string) {
    const { isEnabled } = await draftMode();

    initContentSdk({ preview: isEnabled });

    return await contentSdk.getPage(path);
}

export default async function ProductPage({
    params,
    searchParams
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<Record<string, string>>;
}) {
    const { slug } = await params;
    const search = await searchParams;

    const isEditing = search["wb.editing"] === "true";
    const page = await getPage(`/${slug}`);

    return (
        <PageLayout>
            <DocumentRenderer document={page} isEditing={isEditing} />
        </PageLayout>
    );
}
