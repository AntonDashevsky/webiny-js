import React from "react";
import { Text } from "@webiny/admin-ui";
import { InputFieldProvider } from "~/components";
import { FieldDTOWithElement } from "~/components/AdvancedSearch/domain";

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
            <Text
                size={"sm"}
            >{`Cannot render "${field.type}" field: missing field renderer.`}</Text>
        );
    }

    return (
        <InputFieldProvider field={rest} name={name}>
            {element}
        </InputFieldProvider>
    );
};
