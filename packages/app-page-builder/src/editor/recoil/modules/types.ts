import { type ActiveElementAtomType, type HighlightElementAtomType, type SidebarAtomType, type UiAtomType } from "./ui/index.js";
import { type PbEditorElement } from "~/types.js";

export type PbState<TState = unknown> = {
    activeElement?: ActiveElementAtomType;
    highlightElement?: HighlightElementAtomType;
    elements?: { [id: string]: PbEditorElement };
    ui: UiAtomType;
    rootElement: string;
    sidebar: SidebarAtomType;
} & TState;
