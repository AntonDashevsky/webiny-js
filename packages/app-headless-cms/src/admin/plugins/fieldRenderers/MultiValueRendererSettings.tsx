import React from "react";
import type {
    CmsModelField,
    CmsModelFieldRendererSettingsProps
} from "@webiny/app-headless-cms-common/types/index.js";
import { Bind } from "@webiny/form";
import { Cell } from "@webiny/ui/Grid/index.js";
import { Input } from "@webiny/ui/Input/index.js";

interface IMultiValueRendererSettings {
    addValueButtonLabel: string;
}

const DEFAULT_SETTINGS: IMultiValueRendererSettings = {
    addValueButtonLabel: "Add Value"
};

export const getMultiValueRendererSettings = (
    field: CmsModelField
): IMultiValueRendererSettings => {
    if (typeof field.renderer === "function") {
        return DEFAULT_SETTINGS;
    }

    return field.renderer.settings?.multiValue ?? DEFAULT_SETTINGS;
};

export const MultiValueRendererSettings = ({ field }: CmsModelFieldRendererSettingsProps) => {
    return (
        <Cell span={12}>
            <Bind
                name={"renderer.settings.multiValue.addValueButtonLabel"}
                defaultValue={`Add ${field.label}`}
            >
                <Input label={`"Add Value" Button Label`} />
            </Bind>
        </Cell>
    );
};
