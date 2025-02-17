import React from "react";

import { ButtonDefault } from "@webiny/ui/Button/index.js";

import {
    AddOperationInner,
    ButtonIcon
} from "~/components/BulkActions/ActionEdit/ActionEdit.styled.js";

interface AddOperationProps {
    disabled: boolean;
    onClick: () => void;
}

export const AddOperation = ({ disabled, onClick }: AddOperationProps) => {
    return (
        <AddOperationInner>
            <ButtonDefault disabled={disabled} onClick={onClick}>
                <ButtonIcon disabled={disabled} /> {"Add new operation"}
            </ButtonDefault>
        </AddOperationInner>
    );
};
