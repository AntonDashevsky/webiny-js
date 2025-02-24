import React from "react";
import Helmet from "react-helmet";
import {
    Brand,
    Compose,
    LayoutProps,
    LayoutRenderer,
    LocaleSelector,
    Navigation,
    Search,
    Tags,
    UserMenu
} from "@webiny/app-admin";
import { TopAppBarPrimary, TopAppBarSection } from "@webiny/ui/TopAppBar";
import { Sidebar } from "@webiny/admin-ui/Sidebar";
import { SidebarProvider } from "@webiny/admin-ui/Sidebar/components/SidebarProvider";

const RMWCLayout = () => {
    return function RMWCLayout({ title, children }: LayoutProps) {
        return (
            <>
                <SidebarProvider>
                    {title ? <Helmet title={title} /> : null}
                    <Navigation />

                    <Sidebar.Inset className={"wby-bg-white"}>
                        <Tags tags={{ location: "appBar" }}>
                            <TopAppBarPrimary fixed>
                                <TopAppBarSection style={{ width: "25%" }} alignStart>
                                    <Brand />
                                </TopAppBarSection>
                                <TopAppBarSection style={{ width: "50%" }}>
                                    <Search />
                                </TopAppBarSection>
                                <TopAppBarSection style={{ width: "25%" }} alignEnd>
                                    <LocaleSelector />
                                    <UserMenu />
                                </TopAppBarSection>
                            </TopAppBarPrimary>
                        </Tags>
                        <div style={{ paddingTop: 64 }}>{children}</div>
                    </Sidebar.Inset>
                </SidebarProvider>
            </>
        );
    };
};

export const Layout = () => {
    return <Compose component={LayoutRenderer} with={RMWCLayout} />;
};
