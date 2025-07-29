import type { EventActionCallable, EventActionHandlerCallableArgs } from "~/types";
import type { PageAtomType } from "~/pageEditor/state";
import type { TemplateModeAtomType } from "~/pageEditor/hooks/useTemplateMode";

export interface PageEditorEventActionCallableState {
    page: PageAtomType;
    isTemplateMode: TemplateModeAtomType;
}

export type PageEventActionCallable<TArgs extends EventActionHandlerCallableArgs = any> =
    EventActionCallable<TArgs, PageEditorEventActionCallableState>;
