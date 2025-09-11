import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import type { IconPickerPrimitiveProps } from "./primitives";
import { IconPickerPrimitive } from "./primitives";
import type { FormComponentProps } from "~/FormComponent";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote
} from "~/FormComponent";

type IconPickerProps = IconPickerPrimitiveProps & FormComponentProps;

const DecoratableIconPicker = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    ...props
}: IconPickerProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"wby-w-full"}>
            <FormComponentLabel
                text={label}
                required={required}
                disabled={disabled}
                invalid={invalid}
            />
            <FormComponentDescription text={description} disabled={disabled} />
            <IconPickerPrimitive {...props} disabled={disabled} invalid={invalid} />
            <FormComponentErrorMessage
                text={validationMessage}
                invalid={invalid}
                disabled={disabled}
            />
            <FormComponentNote text={note} disabled={disabled} />
        </div>
    );
};
const IconPicker = makeDecoratable("IconPicker", DecoratableIconPicker);

export { IconPicker, type IconPickerProps };
