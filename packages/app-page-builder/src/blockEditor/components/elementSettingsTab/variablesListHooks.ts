import { type PbEditorElement } from "~/types.js";
import { useUpdateElement } from "~/editor/hooks/useUpdateElement.js";
import { moveInPlace } from "~/hooks/useSortableList.js";

interface UseMoveVariable {
    move: (current: number, next: number) => void;
}

export const useMoveVariable = (element: PbEditorElement): UseMoveVariable => {
    const updateElement = useUpdateElement();
    const move = (current: number, next: number) => {
        const reorderedVariables = moveInPlace(element?.data?.variables ?? [], current, next);

        updateElement({
            ...element,
            data: {
                ...element.data,
                variables: reorderedVariables
            }
        });
    };

    return {
        move
    };
};
