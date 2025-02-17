import React from "react";
import { ReactComponent as RefreshIcon } from "@material-design-icons/svg/round/refresh.svg";
import { TemplateEditorConfig } from "~/templateEditor/editorConfig/TemplateEditorConfig.js";
import { useBlockReference } from "./useBlockReference.js";
import { useRefreshBlock } from "~/editor/hooks/useRefreshBlock.js";

const { ElementAction } = TemplateEditorConfig;

export const RefreshBlockAction = () => {
    const blockReference = useBlockReference();
    const { refreshBlock, loading } = useRefreshBlock();

    if (!blockReference) {
        return null;
    }

    return (
        <ElementAction.IconButton
            label={loading ? "Refreshing..." : "Refresh block"}
            icon={<RefreshIcon />}
            onClick={() => refreshBlock(blockReference.block)}
        />
    );
};
