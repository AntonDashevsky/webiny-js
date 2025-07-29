import React from "react";
import { Textarea } from "@webiny/admin-ui";
import type { ElementInputRendererProps } from "~/BaseEditor";

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
            onChange={newValue => {
                onPreviewChange(({ value }) => {
                    value.set(newValue);
                });
            }}
            onBlur={e =>
                onChange(({ value }) => {
                    value.set(e.currentTarget.value);
                })
            }
            label={label}
            description={input.description}
            note={input.helperText}
            rows={10}
        />
    );
};
