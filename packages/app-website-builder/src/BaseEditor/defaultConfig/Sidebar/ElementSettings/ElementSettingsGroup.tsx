import React from "react";
import { Sidebar } from "~/BaseEditor/config/Sidebar/Sidebar";
import { useActiveElement } from "~/BaseEditor/hooks/useActiveElement";
import { ScrollableContainer } from "~/BaseEditor/config/Sidebar/ScrollableContainer";

export const ElementSettingsGroup = () => {
    const [element] = useActiveElement();

    return (
        <ScrollableContainer>
            <Sidebar.Group.Tab
                name={"element"}
                label={"Element"}
                element={<Sidebar.Elements group={"element"} />}
                disabled={!element}
            />
        </ScrollableContainer>
    );
};
