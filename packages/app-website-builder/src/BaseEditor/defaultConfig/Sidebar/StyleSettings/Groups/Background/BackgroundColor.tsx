import React, { useCallback, useEffect, useRef, useState } from "react";
import { ColorPicker } from "@webiny/admin-ui";

import { useStyles } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/useStyles";
import { InheritanceLabel } from "~/BaseEditor/defaultConfig/Sidebar/InheritanceLabel";

export const BackgroundColor = () => {
    const { styles, onChange, onPreviewChange, inheritanceInfo } = useStyles();
    const [value, setValue] = useState(styles.backgroundColor ?? "#000000");
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (styles.backgroundColor && styles.backgroundColor !== value) {
            setValue(styles.backgroundColor);
        }
    }, [styles.backgroundColor]);

    const handleChange = (value: string) => {
        setValue(value);
        onPreviewChange(styles => {
            styles.backgroundColor = value;
        });

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            onChange(styles => {
                styles.backgroundColor = value;
            });
        }, 300); // wait 300ms after last input event
    };

    const onReset = () => {
        onChange(styles => {
            delete styles.backgroundColor;
        });
    };

    const inheritance = inheritanceInfo?.backgroundColor ?? {};

    return (
        <ColorPicker
            label={
                <InheritanceLabel
                    onReset={onReset}
                    isOverridden={inheritance?.overridden ?? false}
                    inheritedFrom={inheritance?.inheritedFrom}
                    text={"Color"}
                />
            }
            description="Select your background color"
            value={value}
            onChange={handleChange}
        />
    );
};
