import React from "react";
import { Icon, Tabs } from "@webiny/admin-ui";
import { ScrollableContainer } from "~/BaseEditor/config/Sidebar/ScrollableContainer";
import { ReactComponent as InsertIcon } from "@webiny/icons/add_circle_outline.svg";
import { InsertElements } from "./InsertElements";

export const InsertElementsTab = () => {
    return (
        <Tabs.Tab
            value="insert"
            trigger={"Insert"}
            spacing={"sm"}
            icon={<Icon icon={<InsertIcon />} label={"Insert Element"} />}
            content={
                <ScrollableContainer>
                    <InsertElements />
                </ScrollableContainer>
            }
        />
    );
};
