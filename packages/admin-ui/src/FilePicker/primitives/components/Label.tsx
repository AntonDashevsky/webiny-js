import * as React from "react";
import {
    FormComponentDescription,
    FormComponentLabel,
    type FormComponentProps
} from "~/FormComponent";

type FormPickerLabelProps = Pick<
    FormComponentProps,
    "label" | "description" | "disabled" | "required"
> & {
    invalid?: boolean;
    className?: string;
};

const FormPickerLabel = ({
    label,
    description,
    required,
    disabled,
    invalid,
    className
}: FormPickerLabelProps) => {
    return (
        <>
            <FormComponentLabel
                text={label}
                required={required}
                disabled={disabled}
                className={className}
                invalid={invalid}
            />
            <FormComponentDescription text={description} disabled={disabled} />
        </>
    );
};

export { FormPickerLabel, type FormPickerLabelProps };
