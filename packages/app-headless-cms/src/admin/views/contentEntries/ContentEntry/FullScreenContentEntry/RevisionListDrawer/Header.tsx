import React from "react";
import { ReactComponent as CloseIcon } from "@material-design-icons/svg/outlined/close.svg";
import { SimpleFormHeader } from "@webiny/app-admin/components/SimpleForm/index.js";
import { CloseButton } from "./RevisionListDrawer.styled.js";

interface HeaderProps {
    onClose: () => void;
}

export const Header = ({ onClose }: HeaderProps) => {
    return (
        <SimpleFormHeader title={"Entry revisions"}>
            <CloseButton icon={<CloseIcon />} onClick={onClose} />
        </SimpleFormHeader>
    );
};
