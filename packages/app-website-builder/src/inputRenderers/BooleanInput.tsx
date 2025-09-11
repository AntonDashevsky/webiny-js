import React from "react";
import { Switch } from "@webiny/admin-ui";
import type { ElementInputRendererProps } from "~/BaseEditor/index.js";

export const BooleanInputRenderer = ({
    value,
    onChange,
    input,
    label
}: ElementInputRendererProps) => {
    const { description, helperText } = input;
    return (
        <Switch
            label={label}
            note={helperText}
            description={description}
            checked={value}
            onChange={newValue => {
                onChange(({ value }) => {
                    value.set(newValue);
                });
            }}
        />
    );
};
