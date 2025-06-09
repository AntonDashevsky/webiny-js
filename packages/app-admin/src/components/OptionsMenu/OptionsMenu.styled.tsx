import styled, { type StyledComponent } from "@emotion/styled";
import { type MenuProps, Menu as OriginalMenu } from "@webiny/ui/Menu/index.js";

export const Menu: StyledComponent<MenuProps> = styled(OriginalMenu)`
    .disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    .mdc-deprecated-list-item__graphic {
        margin-right: 16px;
    }
`;
