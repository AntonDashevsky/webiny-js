import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { cn, DropdownMenu, Tooltip } from "@webiny/admin-ui";
import { useStyles } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/useStyles";
import { InheritedFrom } from "~/BaseEditor/defaultConfig/Sidebar/InheritanceLabel";
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { BASE_BREAKPOINT } from "~/constants";
// import { ReactComponent as ChevronDown } from "@webiny/icons/keyboard_arrow_down.svg";

type Option = {
    label: string;
    value: string;
};

interface ValueSelectorProps {
    elementId: string;
    propertyName: string;
    options: Option[];
    disabled?: boolean;
}

export const ValueSelector = observer(
    ({ elementId, propertyName, options, disabled }: ValueSelectorProps) => {
        const { breakpoint } = useBreakpoint();
        const { styles, onChange, onPreviewChange, inheritanceMap } = useStyles(elementId);
        const [editing, setEditing] = useState(false);

        const { inheritedFrom, overridden } = inheritanceMap[propertyName] ?? {};

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

        const classNames = cn([
            propertyName.startsWith("margin") ? "wby-bg-neutral-muted" : "wby-bg-neutral-light",
            overridden && inheritedFrom && "wby-bg-success-default wby-text-neutral-light",
            disabled && "wby-bg-neutral-disabled wby-text-neutral-disabled wby-pointer-events-none",
            "wby-flex wby-flex-row wby-text-sm wby-my-sm wby-mx-auto wby-items-center wby-rounded-sm wby-py-[1px] wby-px-[2px]"
        ]);

        const controls = (
            <div className={classNames}>
                <input
                    disabled={isAuto || disabled}
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

        if (BASE_BREAKPOINT === breakpoint.name) {
            return controls;
        }

        const onReset = () => {
            onChange(({ styles }) => {
                styles.unset(propertyName);
            });
        };

        return (
            <Tooltip
                rawTrigger
                trigger={controls}
                content={
                    <InheritedFrom
                        inheritedFrom={inheritedFrom ?? BASE_BREAKPOINT}
                        overriddenAt={overridden ? breakpoint.name : null}
                        onReset={onReset}
                    />
                }
                align="center"
                side="bottom"
                variant="accent"
                showArrow={true}
            />
        );
    }
);

ValueSelector.displayName = "ValueSelector";
