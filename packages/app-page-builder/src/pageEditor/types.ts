import { EventActionCallable, EventActionHandlerCallableArgs } from "~/types.js";
import { PageAtomType } from "~/pageEditor/state/index.js";
import { TemplateModeAtomType } from "~/pageEditor/hooks/useTemplateMode.js";

export interface PageEditorEventActionCallableState {
    page: PageAtomType;
    isTemplateMode: TemplateModeAtomType;
}

export type PageEventActionCallable<TArgs extends EventActionHandlerCallableArgs = any> =
    EventActionCallable<TArgs, PageEditorEventActionCallableState>;
