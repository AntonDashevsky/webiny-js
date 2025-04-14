import * as React from "react";
import { CmsModelField } from "~/types";
import { BindComponentRenderProp } from "@webiny/form";
import { Input as UiInput, Icon } from "@webiny/admin-ui";

export interface TrailingIcon {
    icon: React.ReactNode;
    onClick: any;
}

export interface InputProps {
    step?: number;
    type?: string;
    bind: BindComponentRenderProp;
    field: CmsModelField;
    trailingIcon?: TrailingIcon;
}

export const Input = ({ bind, trailingIcon, ...props }: InputProps) => {
    const endIcon = React.useMemo(() => {
        if (!trailingIcon) {
            return undefined;
        }

        return (
            <Icon
                label={"Icon"}
                icon={trailingIcon?.icon}
                onClick={trailingIcon?.onClick}
                className={"wby-cursor-pointer"}
            />
        );
    }, [trailingIcon]);

    return (
        <UiInput
            {...props}
            {...bind}
            onChange={value => {
                if (props.type === "number") {
                    value = parseFloat(value);
                }
                return bind.onChange(value);
            }}
            label={props.field.label}
            placeholder={props.field.placeholderText}
            description={props.field.multipleValues ? undefined : props.field.helpText}
            type={props.type}
            endIcon={endIcon}
            data-testid={`fr.input.${props.field.label}`}
        />
    );
};
