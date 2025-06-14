import { useSelectFromState } from "~/react/components/useSelectFromState";
import { useDocumentStore } from "~/react";

export const useDocumentState = () => {
    const documentStore = useDocumentStore();
    return useSelectFromState(
        () => documentStore.getDocument()!,
        document => document.state ?? {}
    );
};
