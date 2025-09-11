import React from "react";
import { Select } from "@webiny/admin-ui";
import type { ElementInputRendererProps } from "~/BaseEditor";
import type { SelectInput } from "@webiny/website-builder-sdk";

export const SelectInputRenderer = ({
    value,
    onChange,
    label,
    ...props
}: ElementInputRendererProps) => {
    const input = props.input as SelectInput;
    return (
        <Select
            value={value}
            onChange={newValue => {
                onChange(({ value }) => {
                    value.set(newValue);
                });
            }}
            displayResetAction={input.showResetAction !== false}
            options={input.options}
            label={label}
            description={input.description}
            note={input.helperText}
        />
    );
};
