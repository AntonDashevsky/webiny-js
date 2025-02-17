import React from "react";

import { Typography } from "@webiny/ui/Typography/index.js";
import { InputFieldProvider } from "~/components/index.js";
import { FieldDTOWithElement } from "~/components/AdvancedSearch/domain/index.js";

interface InputFieldProps {
    field?: FieldDTOWithElement;
    name: string;
}

export const InputField = ({ field, name }: InputFieldProps) => {
    if (!field) {
        return null;
    }

    const { element, ...rest } = field;

    if (!element) {
        return (
            <Typography
                use={"body2"}
            >{`Cannot render "${field.type}" field: missing field renderer.`}</Typography>
        );
    }

    return (
        <InputFieldProvider field={rest} name={name}>
            {element}
        </InputFieldProvider>
    );
};
