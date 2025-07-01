import React from "react";
import { PageContent } from "@/webiny/PageContent";
import { contentSdk } from "@webiny/website-builder-react";
import { initContentSdk } from "@/webiny/initContentSdk";

export async function generateStaticParams() {
    initContentSdk();
    const pages = await contentSdk.listPages();

    return pages.map(page => ({ slug: page.properties.path }));
}

async function getPage(path: string) {
    initContentSdk();

    return await contentSdk.getPage(path);
}

export default async function ProductPage({
    params
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<Record<string, string>>;
}) {
    const { slug } = await params;

    const currentPath = `/${slug}`;

    const data = await getPage(currentPath);

    return <PageContent path={currentPath} initialData={data} />;
}
