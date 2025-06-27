import React from "react";
import { Input } from "@webiny/admin-ui";
import { ElementInputRendererProps } from "~/BaseEditor";

export const TextInputRenderer = ({ value, onChange, input, label }: ElementInputRendererProps) => {
    return (
        <Input
            value={value}
            onChange={onChange}
            label={label}
            description={input.description}
            note={input.helperText}
        />
    );
};
