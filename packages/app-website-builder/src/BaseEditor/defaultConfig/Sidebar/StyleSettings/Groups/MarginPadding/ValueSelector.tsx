import React, { useState } from "react";
import { cn, DropdownMenu, Tooltip } from "@webiny/admin-ui";
import { InheritedFrom } from "~/BaseEditor/defaultConfig/Sidebar/InheritanceLabel";
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { BASE_BREAKPOINT } from "~/constants";

type Option = {
    label: string;
    value: string;
};

interface ValueSelectorProps {
    value: string;
    unit: string;
    units: Option[];
    onChange: (value: string) => void;
    onChangePreview: (value: string) => void;
    onReset: () => void;
    inheritedFrom?: string;
    overridden?: boolean;
    disabled?: boolean;
}

export const ValueSelector = (props: ValueSelectorProps) => {
    const { breakpoint } = useBreakpoint();
    const [editing, setEditing] = useState(false);

    const defaultValue = editing ? "" : 0;

    const isAuto = props.value === "auto";

    const setUnit = (unit: string) => {
        setEditing(false);
        props.onChange(unit === "auto" ? "auto" : `${props.value}${unit}`);
    };

    const setValue = (value: string) => {
        const parsedValue = parseInt(value);
        const finalValue = isNaN(parsedValue) ? 0 : parsedValue;
        props.onChange(`${finalValue}${props.unit}`);

        setTimeout(() => {
            setEditing(false);
        }, 20);
    };

    const setPreviewValue = (value: string) => {
        setEditing(true);
        let finalValue: string | number = "";
        if (value !== "") {
            const parsedValue = parseInt(value);
            finalValue = isNaN(parsedValue) ? 0 : parsedValue;
        }
        props.onChangePreview(`${finalValue}${props.unit}`);
    };

    const classNames = cn([
        // propertyName.startsWith("margin") ? "wby-bg-neutral-muted" : "wby-bg-neutral-light",
        props.overridden && props.inheritedFrom && "wby-bg-success-default wby-text-neutral-light",
        props.disabled &&
            "wby-bg-neutral-disabled wby-text-neutral-disabled wby-pointer-events-none",
        "wby-flex wby-flex-row wby-text-sm wby-my-sm wby-mx-auto wby-items-center wby-rounded-sm wby-py-[1px] wby-px-[2px]"
    ]);

    const controls = (
        <div className={classNames}>
            <input
                disabled={isAuto || props.disabled}
                value={isAuto ? "" : props.value ?? defaultValue}
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
                    <div className={"wby-flex wby-flex-row wby-items-center wby-cursor-pointer"}>
                        {props.unit}
                    </div>
                }
            >
                {props.units.map(option => (
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

    return (
        <Tooltip
            rawTrigger
            trigger={controls}
            content={
                <InheritedFrom
                    inheritedFrom={props.inheritedFrom ?? BASE_BREAKPOINT}
                    overriddenAt={props.overridden ? breakpoint.name : null}
                    onReset={props.onReset}
                />
            }
            align="center"
            side="bottom"
            variant="accent"
            showArrow={true}
        />
    );
};
