import React, { useEffect } from "react";
import type { InputProps } from "./Input.js";
import { Input } from "./Input.js";
import {
    getCurrentLocalTime,
    getDefaultFieldValue
} from "~/admin/plugins/fieldRenderers/dateTime/utils.js";

export const Time = (props: InputProps) => {
    const { field, bind } = props;
    const time = getDefaultFieldValue(field, bind, () => {
        return getCurrentLocalTime(new Date());
    });

    const bindValue = bind.value || "";

    useEffect(() => {
        if (!time || bindValue === time) {
            return;
        }
        bind.onChange(time);
    }, [bindValue]);

    return (
        <Input
            {...props}
            bind={{
                ...bind,
                value: time,
                onChange: async (value: string): Promise<void> => {
                    if (!value) {
                        if (bind.value) {
                            return;
                        }
                        return bind.onChange("");
                    }
                    return bind.onChange(value);
                }
            }}
            type={"time"}
            step={60}
        />
    );
};
