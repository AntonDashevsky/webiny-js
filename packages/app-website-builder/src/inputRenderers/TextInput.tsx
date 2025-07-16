import React from "react";
import { Input } from "@webiny/admin-ui";
import { ElementInputRendererProps } from "~/BaseEditor";

export const TextInputRenderer = ({
    value,
    onChange,
    onPreviewChange,
    input,
    label
}: ElementInputRendererProps) => {
    const commitValue = (newValue: string) => {
        onChange(({ value }) => {
            value.set(newValue);
        });
    };

    const previewValue = (newValue: string) => {
        onPreviewChange(({ value }) => {
            value.set(newValue);
        });
    };

    return (
        <Input
            value={value}
            onChange={previewValue}
            onBlur={e => commitValue(e.currentTarget.value)}
            onEnter={e => commitValue(e.currentTarget.value)}
            label={label}
            description={input.description}
            note={input.helperText}
        />
    );
};
