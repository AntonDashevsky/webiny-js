import { useCallback, useEffect, useMemo, useState } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { Commands } from "~/BaseEditor";
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { useBindingsForElement } from "../ElementSettings/useBindingsForElement";
import { StylesBindingsProcessor } from "~/sdk/StylesBindingsProcessor";
import {
    BreakpointElementMetadata,
    ElementMetadata,
    IMetadata,
    StylesMetadata
} from "~/BaseEditor/metadata";

export type OnChangeParams = {
    styles: StylesValueObject;
    metadata: IMetadata;
};

class StylesValueObject {
    private readonly value: Record<string, any>;

    constructor(value: any = {}) {
        this.value = value;
    }

    set(key: string, value: any) {
        this.value[key] = value;
    }

    get(key: string) {
        return this.value[key];
    }

    getAll() {
        return this.value;
    }

    unset(key: string) {
        delete this.value[key];
    }
}

export const useStyles = (elementId: string) => {
    const [localState, setLocalValue] = useState<Record<string, any>>();
    const { breakpoint, breakpoints } = useBreakpoint();
    const editor = useDocumentEditor();

    useEffect(() => {
        setLocalValue(undefined);
    }, [elementId]);

    const breakpointNames = breakpoints.map(bp => bp.name);

    // These bindings already include per-breakpoint overrides.
    const { rawBindings, resolvedBindings, inheritanceMap } = useBindingsForElement(elementId);

    const stylesProcessor = new StylesBindingsProcessor(
        elementId,
        breakpoints.map(bp => bp.name),
        rawBindings
    );

    const elementMetadata: IMetadata = useMemo(() => {
        return new StylesMetadata(
            new BreakpointElementMetadata(
                breakpointNames,
                breakpoint.name,
                new ElementMetadata(elementId, rawBindings.metadata)
            )
        );
    }, [elementId, breakpoint.name, rawBindings]);

    const devFriendlyStyles = stylesProcessor.toDeepStyles(resolvedBindings.styles);

    const onChange = useCallback(
        (cb: (params: OnChangeParams) => void) => {
            const styles = new StylesValueObject(devFriendlyStyles);

            // Apply changes by reference.
            cb({ styles, metadata: elementMetadata });

            // Apply final styles to element bindings.
            const updatedStyles = stylesProcessor.createUpdate(styles.getAll(), breakpoint.name);

            editor.updateDocument(document => {
                updatedStyles.applyToDocument(document);
                elementMetadata.applyToDocument(document);
            });

            // Clear local value
            setLocalValue(undefined);
        },
        [elementId, devFriendlyStyles, breakpoint]
    );

    const onPreviewChange = useCallback(
        (cb: (params: OnChangeParams) => void) => {
            const styles = new StylesValueObject(devFriendlyStyles);

            cb({ styles, metadata: elementMetadata });

            const finalStyles = styles.getAll();

            // For preview, we need to store a local copy of styles, to avoid updating editor state.
            setLocalValue(finalStyles);

            const updatedStyles = stylesProcessor.createUpdate(finalStyles, breakpoint.name);

            editor.executeCommand(Commands.PreviewPatchElement, {
                elementId,
                patch: updatedStyles.createJsonPatch(rawBindings)
            });
        },
        [elementId, devFriendlyStyles, breakpoint]
    );

    return {
        styles: localState ?? devFriendlyStyles,
        metadata: elementMetadata,
        inheritanceMap: inheritanceMap.styles,
        onChange,
        onPreviewChange
    };
};
