import React from "react";
import Helmet from "react-helmet";
import type { LayoutProps } from "@webiny/app-admin";
import {
    LayoutRenderer,
    LocaleSelector,
    Navigation,
    TenantSelector,
    UserMenu
} from "@webiny/app-admin";
import { HeaderBar, cn, useSidebar } from "@webiny/admin-ui";

export const Layout = LayoutRenderer.createDecorator(() => {
    return function Layout({
        title,
        startElement = null,
        hideNavigation = false,
        children
    }: LayoutProps) {
        const { pinned } = useSidebar();

        const widthClassNames = {
            "wby-max-w-[calc(100%-theme(spacing.sidebar-expanded))] ": pinned,
            "wby-max-w-[calc(100%-theme(spacing.sidebar-collapsed))] ": !pinned
        };

        return (
            <>
                {title ? <Helmet title={title} /> : null}
                {hideNavigation ? null : <Navigation />}
                <div
                    className={cn(
                        "wby-ml-auto wby-bg-neutral-base wby-transition-[max-width,min-width] wby-ease-linear wby-w-full",
                        hideNavigation ? undefined : widthClassNames
                    )}
                >
                    <HeaderBar
                        start={startElement}
                        end={
                            <div className={"wby-flex"}>
                                <LocaleSelector />
                                <TenantSelector />
                                <UserMenu />
                            </div>
                        }
                    />
                    <main className={"wby-relative wby-overflow-y-auto wby-h-main-content"}>
                        {children}
                    </main>
                </div>
            </>
        );
    };
});
