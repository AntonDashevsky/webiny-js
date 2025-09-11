import * as React from "react";
import type { SelectProps as UiSelectProps } from "@webiny/admin-ui";
import { Select as UiSelect } from "@webiny/admin-ui";

export interface Option {
    value: string;
    label: string;
}

export interface SelectProps extends UiSelectProps {
    options: Option[];
}
export const Select = (props: SelectProps) => {
    return (
        <UiSelect
            {...props}
            options={props.options.map(option => ({
                value: option.value,
                label: option.label,
                "data-testid": `fr.input.${option.label}`
            }))}
        />
    );
};
