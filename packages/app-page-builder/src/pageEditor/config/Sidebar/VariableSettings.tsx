import React from "react";
import { VariableSettings as BaseVariableSettings } from "~/editor/plugins/elementSettings/variable/VariableSettings.js";
import { useTemplateMode } from "~/pageEditor/hooks/useTemplateMode.js";
import { useBlockReference } from "~/templateEditor/config/Sidebar/useBlockReference.js";

export const VariableSettings = () => {
    const blockReference = useBlockReference();
    const [isTemplateMode] = useTemplateMode();

    if (isTemplateMode || blockReference) {
        return <BaseVariableSettings />;
    }

    return null;
};
