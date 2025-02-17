import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as CloseIcon } from "@material-design-icons/svg/outlined/close.svg";
import { IconButton } from "@webiny/ui/Button/index.js";
import { SimpleFormHeader } from "@webiny/app-admin/components/SimpleForm/index.js";
import { useFileDetails } from "~/hooks/useFileDetails.js";

const CloseButton = styled(IconButton)`
    position: absolute;
    top: 15px;
`;

export const Header = () => {
    const { close } = useFileDetails();

    return (
        <SimpleFormHeader title={"File details"}>
            <CloseButton icon={<CloseIcon />} onClick={close} />
        </SimpleFormHeader>
    );
};
