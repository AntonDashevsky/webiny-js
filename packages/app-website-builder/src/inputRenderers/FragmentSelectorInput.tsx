import React, { useMemo } from "react";
import { Select } from "@webiny/admin-ui";
import type { ElementInputRendererProps } from "~/BaseEditor/index.js";
import { useSelectFromEditor } from "~/BaseEditor/hooks/useSelectFromEditor.js";
import { toTitleCaseLabel } from "~/shared/toTitleCaseLabel.js";

export const FragmentSelectorInputRenderer = ({
    value,
    onChange,
    label,
    input
}: ElementInputRendererProps) => {
    const fragmentNames = useSelectFromEditor<string[]>(state => state.fragments ?? []);
    const options = useMemo(() => {
        return fragmentNames.sort().map(name => ({
            label: toTitleCaseLabel(name),
            value: name
        }));
    }, [fragmentNames]);

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
