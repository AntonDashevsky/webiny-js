import React from "react";
import { InheritanceLabel } from "../../../InheritanceLabel";
import { useStyleValue } from "../../useStyleValue";
import { UnitValuePicker, type UnitOption } from "../../UnitValuePicker";

interface WidthProps {
    elementId: string;
    label: string;
    propertyName: string;
    unitOptions: UnitOption[];
    defaultValue?: string;
}

export const LengthWithUnitInput = ({
    elementId,
    label,
    propertyName,
    defaultValue,
    unitOptions
}: WidthProps) => {
    const width = useStyleValue(elementId, propertyName, defaultValue);

    return (
        <div>
            <InheritanceLabel text={label} onReset={width.onReset} isOverridden={false} />
            <div className={"wby-flex wby-flex-row wby-w-full"}>
                <UnitValuePicker
                    value={width.value}
                    unit={width.unit}
                    units={unitOptions}
                    onChange={width.onChange}
                    onChangePreview={width.onChangePreview}
                />
            </div>
        </div>
    );
};
