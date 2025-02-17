import React from "react";
import { Sidebar } from "~/editor/config/Sidebar/Sidebar.js";
import { ScrollableContainer } from "~/editor/config/Sidebar/ScrollableContainer.js";

export const StyleSettingsGroup = () => {
    return (
        <ScrollableContainer>
            <Sidebar.Group.Tab label={"Style"} element={<Sidebar.Elements group={"style"} />} />
        </ScrollableContainer>
    );
};
