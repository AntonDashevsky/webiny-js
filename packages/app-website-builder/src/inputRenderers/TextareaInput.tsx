import React from "react";
import { Textarea } from "@webiny/admin-ui";
import { ElementInputRendererProps } from "~/BaseEditor";

export const TextareaInputRenderer = ({
    value,
    onChange,
    onPreviewChange,
    input,
    label
}: ElementInputRendererProps) => {
    return (
        <Textarea
            value={value || ""}
            onChange={onPreviewChange}
            onBlur={e => onChange(e.currentTarget.value)}
            label={label}
            description={input.description}
            note={input.helperText}
            rows={10}
        />
    );
};
