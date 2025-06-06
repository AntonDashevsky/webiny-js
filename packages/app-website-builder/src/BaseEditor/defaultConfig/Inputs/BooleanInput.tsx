import { Switch } from "@webiny/admin-ui";
import React from "react";
import type { TextInput } from "~/sdk/types";

interface ElementInputProps<T> {
    value: T;
    onChange: (value: T) => void;
    input: TextInput;
}

export const BooleanInputRenderer = ({ value, onChange, input }: ElementInputProps<boolean>) => {
    const { label, description, helperText } = input;
    return (
        <Switch
            label={label}
            note={helperText}
            description={description}
            checked={value}
            onChange={onChange}
        />
    );
};
