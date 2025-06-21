import React from "react";
import { Input } from "@webiny/admin-ui";
import { ElementInputRendererProps } from "~/BaseEditor";

export const NumberInputRenderer = ({ value, onChange, input }: ElementInputRendererProps) => {
    return (
        <Input
            type={"number"}
            value={value}
            onChange={value => onChange(parseInt(value))}
            label={input.label}
            description={input.description}
            note={input.helperText}
        />
    );
};
