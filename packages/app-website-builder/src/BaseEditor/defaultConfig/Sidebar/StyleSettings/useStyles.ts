import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { useDocumentEditor } from "~/DocumentEditor";
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { StylesStore, type ElementBreakpointStyles } from "./StylesStore";
import { NullMetadata } from "~/BaseEditor/metadata";

// Singleton store container
const stylesStores = new Map<string, StylesStore>();

export type { ElementBreakpointStyles };

export function useStyles(elementId: string) {
    const editor = useDocumentEditor();
    const { breakpoints } = useBreakpoint();

    const [vm, setVm] = useState<ElementBreakpointStyles>({
        styles: {},
        metadata: new NullMetadata(),
        inheritanceMap: {}
    });

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

    useEffect(() => {
        setVm(store.vm);
    }, []);

    useEffect(() => {
        autorun(() => {
            setVm(store.vm);
        });
    }, [store]);

    return {
        styles: vm.styles,
        metadata: vm.metadata,
        inheritanceMap: vm.inheritanceMap,
        onChange: store.onChange,
        onPreviewChange: store.onPreviewChange
    };
}
