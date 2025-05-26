import React from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import { contentSdk } from "@webiny/app-website-builder/react/index";
import { customComponents } from "@components/customComponents";
import { PageLayout } from "@components/PageLayout";

// This is only for debugging purposes, while editor mechanics are being established!
const PageRenderer = dynamic(
    () =>
        import(
            /* webpackChunkName: "PageRenderer" */ "@webiny/app-website-builder/react/components"
        ).then(m => m.PageRenderer),
    { ssr: false }
);

export async function getStaticPaths() {
    const pages = await contentSdk.listPages();

    return {
        paths: pages.map(page => `${page.properties.path}`),
        fallback: true
    };
}

export async function getStaticProps(context: GetStaticPropsContext<{ slug: string[] }>) {
    const slug = context.params?.slug || [];
    const path = "/" + slug.join("/");
    const page = await contentSdk.getPage(path);

    return {
        props: {
            page,
            path
        },
        revalidate: 1
    };
}

export default function Sandbox({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <PageLayout>
            <PageRenderer page={page} components={customComponents} />
        </PageLayout>
    );
}
