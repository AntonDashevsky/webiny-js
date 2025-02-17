import React from "react";

import { Bind } from "@webiny/form";
import { Input as BaseInput } from "@webiny/ui/Input/index.js";
import { useInputField } from "~/components/index.js";

export const Input = () => {
    const { name, field } = useInputField();

    return (
        <Bind name={name}>
            <BaseInput label={"Value"} type={field.type} />
        </Bind>
    );
};
