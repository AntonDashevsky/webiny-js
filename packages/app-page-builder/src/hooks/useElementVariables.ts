import { useMemo } from "react";
import { useParentBlock } from "@webiny/app-page-builder-elements/renderers/block.js";
import { PbEditorElement } from "~/types.js";

export function useElementVariables(element: PbEditorElement | null) {
    const block = useParentBlock() as PbEditorElement | null;

    const variableValue = useMemo(() => {
        const { variableId } = element?.data || {};

        if (!variableId || !block) {
            return null;
        }

        const variable = block.data.variables?.filter(
            variable => variable.id.split(".")[0] === variableId
        );

        return variable;
    }, [block, element]);

    return variableValue ?? [];
}
