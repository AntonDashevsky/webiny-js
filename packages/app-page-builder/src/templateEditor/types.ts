import { type EventActionCallable, type EventActionHandlerCallableArgs, type PbPageTemplate } from "~/types.js";

export interface TemplateEditorEventActionCallableState {
    template: PbPageTemplate;
}

export type TemplateEventActionCallable<TArgs extends EventActionHandlerCallableArgs = any> =
    EventActionCallable<TArgs, TemplateEditorEventActionCallableState>;
