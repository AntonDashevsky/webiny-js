import React from "react";
import { observer } from "mobx-react-lite";
import { InheritanceLabel } from "../../../InheritanceLabel";
import { useStyleValue } from "../../useStyleValue";
import { UnitValuePicker, type UnitOption } from "../../UnitValuePicker";

interface LengthWithUnitInputProps {
    elementId: string;
    label: string;
    propertyName: string;
    unitOptions: UnitOption[];
    defaultValue?: string;
}

export const LengthWithUnitInput = observer(
    ({ elementId, label, propertyName, defaultValue, unitOptions }: LengthWithUnitInputProps) => {
        const style = useStyleValue(elementId, propertyName, defaultValue);

        return (
            <div>
                <InheritanceLabel
                    text={label}
                    onReset={style.onReset}
                    isOverridden={style.overridden}
                    inheritedFrom={style.inheritedFrom}
                />
                <div className={"wby-flex wby-flex-row wby-w-full"}>
                    <UnitValuePicker
                        value={style.value}
                        unit={style.unit}
                        units={unitOptions}
                        onChange={style.onChange}
                        onChangePreview={style.onChangePreview}
                    />
                </div>
            </div>
        );
    }
);
