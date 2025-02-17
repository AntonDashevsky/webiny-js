import React from "react";
import { Sidebar } from "~/editor/config/Sidebar/Sidebar.js";
import { useActiveElement } from "~/editor/hooks/useActiveElement.js";
import { ScrollableContainer } from "~/editor/config/Sidebar/ScrollableContainer.js";

export const ElementSettingsGroup = () => {
    const [element] = useActiveElement();

    return (
        <ScrollableContainer>
            <Sidebar.Group.Tab
                label={"Element"}
                element={<Sidebar.Elements group={"element"} />}
                disabled={!element}
            />
        </ScrollableContainer>
    );
};
