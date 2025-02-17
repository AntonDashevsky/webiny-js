import React from "react";
import { ButtonDefault } from "@webiny/ui/Button/index.js";
import { AddGroupInner, ButtonIcon } from "../../Querybuilder.styled.js";

interface AddGroupProps {
    onClick: () => void;
}

export const AddGroup = ({ onClick }: AddGroupProps) => {
    return (
        <AddGroupInner>
            <ButtonDefault onClick={onClick}>
                <ButtonIcon /> {"Add new filter group"}
            </ButtonDefault>
        </AddGroupInner>
    );
};
