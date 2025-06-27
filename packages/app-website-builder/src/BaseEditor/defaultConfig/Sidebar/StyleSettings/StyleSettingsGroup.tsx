import React from "react";
import { Sidebar } from "~/BaseEditor/config/Sidebar/Sidebar";
import { ScrollableContainer } from "~/BaseEditor/config/Sidebar/ScrollableContainer";

export const StyleSettingsGroup = () => {
    return (
        <ScrollableContainer>
            <Sidebar.Group.Tab
                name={"style"}
                label={"Style"}
                element={<Sidebar.Elements group={"style"} />}
                noPadding={true}
            />
        </ScrollableContainer>
    );
};
