import React from "react";
import { observer } from "mobx-react-lite";
import { Switch } from "@webiny/admin-ui";
import { useStyles } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/useStyles.js";
import { InheritanceLabel } from "~/BaseEditor/defaultConfig/Sidebar/InheritanceLabel.js";

export interface VisibilityProps {
    elementId: string;
}

export const Visibility = observer(({ elementId }: VisibilityProps) => {
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
});
