import React from "react";
import styled from "@emotion/styled";
import { makeDecoratable } from "@webiny/app-admin";
import { Tabs } from "@webiny/admin-ui";
import { Sidebar } from "./Sidebar";

const SidebarContainer = styled.div`
    background-color: #ffffff;
    border-left: 1px solid var(--mdc-theme-on-background);
`

export const Layout = makeDecoratable("SidebarLayout", () => {
    const { activeGroup, setActiveGroup } = Sidebar.useActiveGroup();

    return (
        <SidebarContainer>
            <Tabs
                size="md"
                spacing={"md"}
                separator={true}
                value={activeGroup}
                defaultValue={"style"}
                onValueChange={setActiveGroup}
                tabs={[<Sidebar.Elements group="groups" key={"groups"} />]}
            />
        </SidebarContainer>
    );
});
