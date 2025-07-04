import React, { useState } from "react";
import { DropdownMenu /* Icon */ } from "@webiny/admin-ui";
import { useStyles } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/useStyles";
import { observer } from "mobx-react-lite";
// import { ReactComponent as ChevronDown } from "@webiny/icons/keyboard_arrow_down.svg";

type Option = {
    label: string;
    value: string;
};

interface ValueSelectorProps {
    elementId: string;
    propertyName: string;
    options: Option[];
}

export const ValueSelector = observer(
    ({ elementId, propertyName, options }: ValueSelectorProps) => {
        const { styles, onChange, onPreviewChange, inheritanceMap } = useStyles(elementId);
        const [editing, setEditing] = useState(false);

        const defaultValue = editing ? "" : 0;

        const [match, value = defaultValue, unit = "px"] =
            (styles[propertyName] ?? "").match(/(\d+)?(\S+)/) ?? [];

        const isAuto = match === "auto";

        const setUnit = (unit: string) => {
            setEditing(false);
            onChange(({ styles }) => {
                styles.set(propertyName, unit === "auto" ? "auto" : `${value}${unit}`);
            });
        };

        const setValue = (value: string) => {
            onChange(({ styles }) => {
                const parsedValue = parseInt(value);
                const finalValue = isNaN(parsedValue) ? 0 : parsedValue;
                styles.set(propertyName, `${finalValue}${unit}`);
            });
            setTimeout(() => {
                setEditing(false);
            }, 20);
        };

        const setPreviewValue = (value: string) => {
            setEditing(true);
            onPreviewChange(({ styles }) => {
                let finalValue: string | number = "";
                if (value !== "") {
                    const parsedValue = parseInt(value);
                    finalValue = isNaN(parsedValue) ? 0 : parsedValue;
                }
                styles.set(propertyName, `${finalValue}${unit}`);
            });
        };

        return (
            <div className="wby-flex wby-flex-row wby-text-sm wby-my-sm wby-mx-auto wby-items-center">
                <input
                    disabled={isAuto}
                    value={isAuto ? "" : value}
                    onChange={e => setPreviewValue(e.target.value)}
                    onBlur={e => setValue(e.target.value)}
                    style={{
                        display: isAuto ? "none" : "inline-block",
                        background: "transparent",
                        width: 25,
                        textAlign: "right",
                        paddingRight: 2
                    }}
                />
                <DropdownMenu
                    trigger={
                        <div
                            className={"wby-flex wby-flex-row wby-items-center wby-cursor-pointer"}
                        >
                            {unit}
                            {/*<Icon icon={<ChevronDown />} size={"xs"} label={"Unit"} />*/}
                        </div>
                    }
                >
                    {options.map(option => (
                        <DropdownMenu.Item
                            key={option.value}
                            text={option.label}
                            onClick={() => setUnit(option.value)}
                        />
                    ))}
                </DropdownMenu>
            </div>
        );
    }
);

ValueSelector.displayName = "ValueSelector";
