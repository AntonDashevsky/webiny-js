import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Select } from "@webiny/admin-ui";
import { useStyles } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/useStyles";
import { BackgroundImageParser } from "./BackgroundImageParser";
import { toTitleCaseLabel } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/Groups/Background/toTitleCaseLabel";
import { InheritanceLabel } from "~/BaseEditor/defaultConfig/Sidebar/InheritanceLabel";

interface Scaling {
    name: string;
    backgroundSize: string;
    backgroundRepeat: string;
}

const SCALING_MAP: Scaling[] = [
    {
        name: "cover",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    },
    {
        name: "contain",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat"
    },
    {
        name: "originalSize",
        backgroundSize: "auto",
        backgroundRepeat: "no-repeat"
    },
    {
        name: "tile",
        backgroundSize: "auto",
        backgroundRepeat: "repeat"
    },
    {
        name: "tileHorizontally",
        backgroundSize: "auto",
        backgroundRepeat: "repeat-x"
    },
    {
        name: "tileVertically",
        backgroundSize: "auto",
        backgroundRepeat: "repeat-y"
    }
];

const options = SCALING_MAP.map(item => ({ label: toTitleCaseLabel(item.name), value: item.name }));

export const BackgroundScaling = observer(({ elementId }: { elementId: string }) => {
    const { styles, onChange, inheritanceMap } = useStyles(elementId);

    const scaling = SCALING_MAP.find(item => {
        return (
            item.backgroundSize === styles.backgroundSize &&
            item.backgroundRepeat === styles.backgroundRepeat
        );
    });

    const hasBackgroundImage = useMemo(() => {
        const parser = new BackgroundImageParser(styles.backgroundImage);
        return parser.getRules().find(r => r.type === "url") !== undefined;
    }, [styles.backgroundImage]);

    const onValueChange = (value: string) => {
        onChange(({ styles }) => {
            const scaling = SCALING_MAP.find(item => item.name === value);
            if (scaling) {
                styles.set("backgroundRepeat", scaling.backgroundRepeat);
                styles.set("backgroundSize", scaling.backgroundSize);
            }
        });
    };

    const onReset = () => {
        onChange(({ styles }) => {
            styles.unset("backgroundRepeat");
            styles.unset("backgroundSize");
        });
    };

    const inheritance = inheritanceMap?.backgroundSize ?? {};

    return (
        <Select
            label={
                <InheritanceLabel
                    onReset={onReset}
                    isOverridden={inheritance?.overridden ?? false}
                    inheritedFrom={inheritance?.inheritedFrom}
                    text={"Scaling"}
                />
            }
            description={"Select image scaling"}
            disabled={!hasBackgroundImage}
            value={scaling ? scaling.name : ""}
            displayResetAction={false}
            onChange={onValueChange}
            options={options}
        />
    );
});
