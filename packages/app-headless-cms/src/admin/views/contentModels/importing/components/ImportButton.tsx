import React from "react";
import { ButtonPrimary } from "@webiny/ui/Button/index.js";
import { i18n } from "@webiny/app/i18n/index.js";

const t = i18n.ns("app-headless-cms/admin/views/content-models/import-content-models-dialog");

interface ImportButtonProps {
    onClick: () => void;
    validated: boolean;
    disabled: boolean;
}

export const ImportButton = ({ onClick, validated, disabled }: ImportButtonProps) => {
    const text = validated ? t`Import` : t`Validate file`;
    return (
        <ButtonPrimary onClick={onClick} disabled={disabled}>
            {text}
        </ButtonPrimary>
    );
};
