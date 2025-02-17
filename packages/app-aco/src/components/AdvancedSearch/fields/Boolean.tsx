import React from "react";

import { Bind } from "@webiny/form";
import { Radio, RadioGroup } from "@webiny/ui/Radio/index.js";
import { useInputField } from "~/components/index.js";

export const Boolean = () => {
    const { name } = useInputField();

    return (
        <Bind name={name}>
            {({ value, onChange, validation }) => (
                <RadioGroup validation={validation}>
                    {() => {
                        return (
                            <>
                                <Radio
                                    label="True"
                                    value={value === "true"}
                                    onChange={() => {
                                        onChange("true");
                                    }}
                                />
                                <Radio
                                    label="False"
                                    value={value === "false"}
                                    onChange={() => {
                                        onChange("false");
                                    }}
                                />
                            </>
                        );
                    }}
                </RadioGroup>
            )}
        </Bind>
    );
};
