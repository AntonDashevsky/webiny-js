import React from "react";
import styled from "@emotion/styled";
import { ButtonFloating } from "@webiny/ui/Button/index.js";
import { ReactComponent as AddIcon } from "@material-design-icons/svg/round/add.svg";
import { useBlocksBrowser } from "./useBlocksBrowser.js";

const SIDEBAR_WIDTH = 300;
const BottomRight = styled("div")({
    position: "fixed",
    zIndex: 101,
    bottom: 20,
    right: 20 + SIDEBAR_WIDTH
});

export const AddBlock = () => {
    const { openBrowser } = useBlocksBrowser();

    return (
        <BottomRight>
            <ButtonFloating onClick={openBrowser} icon={<AddIcon />} />
        </BottomRight>
    );
};
