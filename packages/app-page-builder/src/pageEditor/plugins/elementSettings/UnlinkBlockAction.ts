import React, { useCallback } from "react";
import { useActiveElement } from "~/editor/hooks/useActiveElement.js";
import { useUpdateElement } from "~/editor/hooks/useUpdateElement.js";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler.js";
import { removeElementVariableIds } from "~/pageEditor/helpers.js";
import { PbElement } from "~/types.js";

interface UnlinkBlockActionPropsType {
    children: React.ReactElement;
}

const UnlinkBlockAction = ({ children }: UnlinkBlockActionPropsType) => {
    const [element] = useActiveElement();
    const { getElementTree } = useEventActionHandler();
    const updateElement = useUpdateElement();

    // TODO: extract block unlinking logic into a dedicated hook
    const onClick = useCallback(async (): Promise<void> => {
        if (!element) {
            return;
        }

        const variables = element.data.variables || [];
        const newElement = structuredClone(element);
        delete newElement.data["blockId"];
        delete newElement.data["templateBlockId"];
        delete newElement.data["variables"];

        const fullElementTree = (await getElementTree({ element: newElement })) as PbElement;
        const cleanElement = removeElementVariableIds(fullElementTree, variables);

        updateElement(cleanElement);
    }, [element, updateElement]);

    return React.cloneElement(children, { onClick });
};

export default React.memo(UnlinkBlockAction);
