import React, { useCallback, useMemo } from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { MultiFilePickerPrimitive, type MultiFilePickerPrimitiveProps } from "./primitives";
import {
    FormComponentErrorMessage,
    FormComponentNote,
    type FormComponentProps
} from "~/FormComponent";
import {
    FormPickerLabel,
    ImagePreview,
    RichItemPreview,
    TextOnlyPreview
} from "~/FilePicker/primitives/components";

type MultiFilePickerProps = MultiFilePickerPrimitiveProps & FormComponentProps;

const BaseMultiFilePicker = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    validate,
    onBlur: originalOnBlur,
    type = "area",
    ...props
}: MultiFilePickerProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    const onBlur = useCallback(
        async (e: React.FocusEvent<HTMLInputElement>) => {
            if (validate) {
                // Since we are accessing event in an async operation, we need to persist it.
                // See https://reactjs.org/docs/events.html#event-pooling.
                e.persist();
                await validate();
            }
            originalOnBlur && originalOnBlur(e);
        },
        [validate, originalOnBlur]
    );

    return (
        <div className={"wby-w-full"}>
            {type !== "area" && (
                <FormPickerLabel
                    label={label}
                    required={required}
                    disabled={disabled}
                    description={description}
                />
            )}
            <MultiFilePickerPrimitive
                {...props}
                label={
                    <FormPickerLabel
                        label={label}
                        required={required}
                        disabled={disabled}
                        description={description}
                        className={"wby-m-0"}
                    />
                }
                disabled={disabled}
                invalid={invalid}
                onBlur={onBlur}
                type={type}
            />
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </div>
    );
};

const DecoratableMultiFilePicker = makeDecoratable("MultiFilePicker", BaseMultiFilePicker);

const MultiFilePicker = withStaticProps(DecoratableMultiFilePicker, {
    Preview: {
        Image: ImagePreview,
        RichItem: RichItemPreview,
        TextOnly: TextOnlyPreview
    }
});
export { MultiFilePicker, type MultiFilePickerProps };
