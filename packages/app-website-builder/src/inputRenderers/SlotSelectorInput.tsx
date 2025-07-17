import React, { useMemo } from "react";
import { Select } from "@webiny/admin-ui";
import { ElementInputRendererProps } from "~/BaseEditor";
import { useSelectFromEditor } from "~/BaseEditor/hooks/useSelectFromEditor";
import { toTitleCaseLabel } from "~/shared/toTitleCaseLabel";

export const SlotSelectorInputRenderer = ({
    value,
    onChange,
    label,
    input
}: ElementInputRendererProps) => {
    const slotNames = useSelectFromEditor<string[]>(state => state.slots ?? []);
    const options = useMemo(() => {
        return slotNames.sort().map(name => ({
            label: toTitleCaseLabel(name),
            value: name
        }));
    }, [slotNames]);

    return (
        <Select
            value={value}
            onChange={newValue => {
                onChange(({ value }) => {
                    value.set(newValue);
                });
            }}
            displayResetAction={true}
            options={options}
            label={label}
            description={input.description}
            note={input.helperText}
        />
    );
};
