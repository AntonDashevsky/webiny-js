import { useSelectFromState } from "~/react/components/useSelectFromState";
import { useDocumentStore } from "~/react";
import { toJS } from "mobx";

export const useBindingForElement = (elementId: string) => {
    const documentStore = useDocumentStore();
    return useSelectFromState(
        () => documentStore.getDocument()!,
        document => toJS(document.bindings[elementId]),
        [elementId]
    );
};
