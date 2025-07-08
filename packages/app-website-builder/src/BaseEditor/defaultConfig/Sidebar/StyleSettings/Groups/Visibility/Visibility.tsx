import React from "react";
import { Switch } from "@webiny/admin-ui";
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { useStyles } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/useStyles";
import { InheritanceLabel } from "~/BaseEditor/defaultConfig/Sidebar/InheritanceLabel";

export interface VisibilityProps {
    elementId: string;
}

export const Visibility = ({ elementId }: VisibilityProps) => {
    const { breakpoint } = useBreakpoint();
    const { styles, onChange, inheritanceMap } = useStyles(elementId);

    const isVisible = styles.display !== "none";

    const toggleVisibility = (isHidden: boolean) => {
        onChange(({ styles }) => {
            styles.set("display", isHidden ? "none" : "flex");
        });
    };

    const onReset = () => {
        onChange(({ styles }) => {
            styles.unset("display");
        });
    };

    const inheritance = inheritanceMap.display ?? {};

    return (
        <Switch
            label={
                <InheritanceLabel
                    onReset={onReset}
                    isOverridden={inheritance?.overridden ?? false}
                    inheritedFrom={inheritance?.inheritedFrom}
                    text={"Hide element"}
                />
            }
            checked={!isVisible}
            onChange={toggleVisibility}
        />
    );
};
