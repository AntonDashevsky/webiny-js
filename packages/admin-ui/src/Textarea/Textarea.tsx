import React, { useCallback, useMemo } from "react";
import { makeDecoratable } from "~/utils";
import { TextareaPrimitive, TextareaPrimitiveProps } from "./TextareaPrimitive";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type TextareaGroupProps = TextareaPrimitiveProps & FormComponentProps;

const DecoratableTextarea = ({
    label,
    description,
    note,
    required,
    disabled,
    validation,
    validate,
    onBlur: originalOnBlur,
    ...props
}: TextareaGroupProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    const onBlur = useCallback(
        async (e: React.FocusEvent<HTMLTextAreaElement>) => {
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
            <FormComponentLabel
                text={label}
                required={required}
                disabled={disabled}
                invalid={invalid}
            />
            <FormComponentDescription text={description} disabled={disabled} />
            <TextareaPrimitive {...props} disabled={disabled} invalid={invalid} onBlur={onBlur} />
            <FormComponentErrorMessage
                text={validationMessage}
                invalid={invalid}
                disabled={disabled}
            />
            <FormComponentNote text={note} disabled={disabled} />
        </div>
    );
};
const Textarea = makeDecoratable("Textarea", DecoratableTextarea);

export { Textarea };
