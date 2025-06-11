import React from "react";
import { useExpandedEditor } from "./ExpandedEditor";

export const ExpandEditorAction = () => {
    const { setExpanded } = useExpandedEditor();

    return (
        <button
            onClick={() => setExpanded(expanded => !expanded)}
            className={"popup-item wby-absolute wby-right-0 wby-z-1"}
            aria-label="Expand editor"
        >
            <i className="format expand" />
        </button>
    );
};
