import React from "react";
import { contentSdk } from "@webiny/app-website-builder/react/index";
import { PageContent } from "@components/PageContent";

export async function generateStaticParams() {
    const pages = await contentSdk.listPages();

    return pages.map(page => ({ slug: page.properties.path }));
}

async function getPage(path: string) {
    const page = await contentSdk.getPage(path);

    return page;
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
