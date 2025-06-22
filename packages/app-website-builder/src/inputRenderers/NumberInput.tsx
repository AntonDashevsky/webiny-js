import React, { useCallback } from "react";
import { Input } from "@webiny/admin-ui";
import { ElementInputRendererProps } from "~/BaseEditor";
import { NumberInput } from "~/sdk/types";

export const NumberInputRenderer = ({ value, onChange, input }: ElementInputRendererProps) => {
    const localOnChange = useCallback(
        (value: string) => {
            const number = parseInt(value);
            const minValue = (input as NumberInput).minValue;

            if (minValue && number < minValue) {
                return;
            }

            onChange(number);
        },
        [onChange]
    );
    return (
        <Input
            type={"number"}
            value={value}
            onChange={localOnChange}
            label={input.label}
            description={input.description}
            note={input.helperText}
        />
    );
};
