import { ActiveElementAtomType, HighlightElementAtomType, SidebarAtomType, UiAtomType } from "./ui/index.js";
import { PbEditorElement } from "~/types.js";

export type PbState<TState = unknown> = {
    activeElement?: ActiveElementAtomType;
    highlightElement?: HighlightElementAtomType;
    elements?: { [id: string]: PbEditorElement };
    ui: UiAtomType;
    rootElement: string;
    sidebar: SidebarAtomType;
} & TState;
