import { useMemo } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { StylesStore, type ElementBreakpointStyles } from "./StylesStore";

// Singleton store container
const stylesStores = new Map<string, StylesStore>();

export type { ElementBreakpointStyles };

export function useStyles(elementId: string) {
    const editor = useDocumentEditor();
    const { breakpoints } = useBreakpoint();

    const store = useMemo(() => {
        // Create or get existing store for this element
        let store = stylesStores.get(elementId);

        if (!store) {
            store = new StylesStore(
                editor,
                elementId,
                breakpoints.map(bp => bp.name)
            );
            stylesStores.set(elementId, store);
        }

        return store;
    }, [elementId]);

    return {
        store,
        styles: store.vm.styles,
        metadata: store.vm.metadata,
        inheritanceMap: store.vm.inheritanceMap,
        onChange: store.onChange,
        onPreviewChange: store.onPreviewChange
    };
}
