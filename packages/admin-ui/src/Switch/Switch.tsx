import React, { useMemo } from "react";
import { makeDecoratable } from "~/utils";
import type { SwitchPrimitiveProps } from "./primitives";
import { SwitchPrimitive } from "./primitives";
import type { FormComponentProps } from "~/FormComponent";
import { FormComponentErrorMessage, FormComponentNote } from "~/FormComponent";

type SwitchProps = SwitchPrimitiveProps & FormComponentProps;

const DecoratableSwitch = ({ note, validation, ...props }: SwitchProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);

    return (
        <div className={"wby-w-full"}>
            <SwitchPrimitive {...props} disabled={props.disabled} />
            <FormComponentErrorMessage
                text={validationMessage}
                invalid={invalid}
                disabled={props.disabled}
            />
            <FormComponentNote text={note} disabled={props.disabled} />
        </div>
    );
};

const Switch = makeDecoratable("Switch", DecoratableSwitch);

export { Switch };
