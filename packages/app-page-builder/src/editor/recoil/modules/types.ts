import type {
    ActiveElementAtomType,
    HighlightElementAtomType,
    SidebarAtomType,
    UiAtomType
} from "./ui";
import type { PbEditorElement } from "~/types";

export type PbState<TState = unknown> = {
    activeElement?: ActiveElementAtomType;
    highlightElement?: HighlightElementAtomType;
    elements?: { [id: string]: PbEditorElement };
    ui: UiAtomType;
    rootElement: string;
    sidebar: SidebarAtomType;
} & TState;
