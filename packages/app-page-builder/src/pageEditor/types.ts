import { type EventActionCallable, type EventActionHandlerCallableArgs } from "~/types.js";
import { type PageAtomType } from "~/pageEditor/state/index.js";
import { type TemplateModeAtomType } from "~/pageEditor/hooks/useTemplateMode.js";

export interface PageEditorEventActionCallableState {
    page: PageAtomType;
    isTemplateMode: TemplateModeAtomType;
}

export type PageEventActionCallable<TArgs extends EventActionHandlerCallableArgs = any> =
    EventActionCallable<TArgs, PageEditorEventActionCallableState>;
