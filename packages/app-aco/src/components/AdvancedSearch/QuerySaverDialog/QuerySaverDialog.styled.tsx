import styled from "@emotion/styled";
import { Dialog } from "@webiny/ui/Dialog/index.js";

export const DialogContainer = styled(Dialog)`
    z-index: 22;
    .mdc-dialog__surface {
        width: 600px;
        min-width: 600px;
    }
`;
