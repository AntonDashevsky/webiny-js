import React from "react";
import { Page as PageType } from "~/types.js";
import { Content } from "./Content.js";
import { PageProvider } from "~/contexts/Page.js";

export interface PageProps {
    page: PageType;
    layout?: React.ComponentType<{ children: React.ReactNode }>;
    layoutProps?: Record<string, any>;
}

export const Page = (props: PageProps) => {
    const { page, layout } = props;

    let content = <Content content={page.content} />;

    if (layout) {
        const Layout = layout;
        content = <Layout>{content}</Layout>;
    }

    return (
        <PageProvider key={page.id} {...props}>
            {content}
        </PageProvider>
    );
};
