import { useCallback, useState } from "react";
import { useUpdateElement } from "~/editor/hooks/useUpdateElement.js";
import { type PbEditorElement } from "~/types.js";
import { addElementId } from "~/editor/helpers.js";
import { usePageBlocks } from "~/admin/contexts/AdminPageBuilder/PageBlocks/usePageBlocks.js";

export const useRefreshBlock = () => {
    const updateElement = useUpdateElement();
    const { refetchBlock } = usePageBlocks();
    const [loading, setLoading] = useState(false);

    const refreshBlock = useCallback(
        async (block: PbEditorElement) => {
            if (!block?.id || !block.data.blockId) {
                return;
            }

            setLoading(true);
            const pageBlock = await refetchBlock(block.data.blockId);

            const blockDataVariables = pageBlock.content.data.variables || [];
            const variables = blockDataVariables.map((blockDataVariable: any) => {
                const value =
                    block.data?.variables?.find(
                        (variable: any) => variable.id === blockDataVariable.id
                    )?.value || blockDataVariable.value;

                return {
                    ...blockDataVariable,
                    value
                };
            });

            updateElement({
                ...addElementId(pageBlock.content),
                id: block.id,
                data: {
                    ...block?.data,
                    ...pageBlock?.content?.data,
                    variables
                }
            });
            setLoading(false);
        },
        [updateElement]
    );

    return { loading, refreshBlock };
};
