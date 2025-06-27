import React from "react";
import { Select } from "@webiny/admin-ui";
import { ElementInputRendererProps } from "~/BaseEditor";
import type { SelectInput } from "~/sdk/types";

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
            onChange={onChange}
            options={input.options}
            label={label}
            description={input.description}
            note={input.helperText}
        />
    );
};
