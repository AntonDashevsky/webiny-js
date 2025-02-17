import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "~/editor/plugins/elementSettings/components/StyledComponents.js";
import { EditorConfig } from "~/editor/config/index.js";

const SidebarActions = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    borderBottom: `1px solid ${COLORS.gray}`,
    backgroundColor: COLORS.lightGray,
    borderTop: `1px solid ${COLORS.gray}`,
    justifyContent: "center"
});

export const ElementActions = () => {
    return (
        <SidebarActions>
            <EditorConfig.ElementActions />
        </SidebarActions>
    );
};
