import { type PbEditorElement, type PbEditorElementTree } from "~/types.js";

export interface UpdateElementActionArgsType {
    element: PbEditorElement | PbEditorElementTree;
    history: boolean;
    triggerUpdateElementTree?: boolean;
    debounce?: boolean;
    onFinish?: () => void;
}
