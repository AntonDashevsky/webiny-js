import React from "react";
import { Sidebar } from "~/BaseEditor/config/Sidebar/Sidebar";
import { ScrollableContainer } from "~/BaseEditor/config/Sidebar/ScrollableContainer";

export const StyleSettingsGroup = () => {
    return (
        <ScrollableContainer tabIndex={-1}>
            <Sidebar.Group.Tab
                name={"style"}
                label={"Style"}
                element={<Sidebar.Elements group={"style"} />}
                noPadding={true}
            />
        </ScrollableContainer>
    );
};
