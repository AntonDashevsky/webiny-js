import { toJS } from "mobx";
import { useSelectFromState } from "~/react/components/useSelectFromState";
import { useDocumentStore } from "~/react";
import { BindingsProcessor } from "~/sdk/BindingsProcessor";
import { useViewport } from "./useViewportInfo";

export const useBindingsForElement = (elementId: string) => {
    const documentStore = useDocumentStore();
    const viewport = useViewport();

    return useSelectFromState(
        () => documentStore.getDocument()!,
        document => {
            const bindings = toJS(document.bindings[elementId]) ?? {};
            const breakpoints = viewport.breakpoints.map(bp => bp.name);

            // Merge element bindings.
            const bindingsProcessor = new BindingsProcessor(breakpoints);

            return bindingsProcessor.getBindings(bindings, viewport.breakpoint);
        },
        [elementId, viewport.breakpoint]
    );
};
