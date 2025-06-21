import React from "react";
import { Textarea } from "@webiny/admin-ui";
import { ElementInputRendererProps } from "~/BaseEditor";

export const TextareaInputRenderer = ({
    value,
    onChange,
    onPreviewChange,
    input
}: ElementInputRendererProps) => {
    return (
        <Textarea
            value={value || ""}
            onChange={onPreviewChange}
            onBlur={e => onChange(e.currentTarget.value)}
            label={input.label}
            description={input.description}
            note={input.helperText}
            rows={10}
        />
    );
};
