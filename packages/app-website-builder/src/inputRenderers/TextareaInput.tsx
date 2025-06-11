import React from "react";
import { Textarea } from "@webiny/admin-ui";
import { ElementInputRendererProps } from "~/BaseEditor";

export const TextareaInputRenderer = ({ value, onChange, input }: ElementInputRendererProps) => {
    return (
        <Textarea
            value={value}
            onChange={onChange}
            label={input.label}
            description={input.description}
            note={input.helperText}
        />
    );
};
