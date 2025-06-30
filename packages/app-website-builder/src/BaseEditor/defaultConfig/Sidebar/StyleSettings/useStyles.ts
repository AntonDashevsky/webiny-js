import { useCallback, useMemo, useState } from "react";
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
    styles: Record<string, any>;
    metadata: IMetadata;
};

export const useStyles = (elementId: string) => {
    const [localState, setLocalValue] = useState<Record<string, any>>();
    const { breakpoint, breakpoints } = useBreakpoint();
    const editor = useDocumentEditor();

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
            // Apply changes by reference.
            cb({ styles: devFriendlyStyles, metadata: elementMetadata });

            // Apply final styles to element bindings.
            const updatedStyles = stylesProcessor.createUpdate(devFriendlyStyles, breakpoint.name);

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
            cb({ styles: devFriendlyStyles, metadata: elementMetadata });

            setLocalValue(devFriendlyStyles);

            const updatedStyles = stylesProcessor.createUpdate(devFriendlyStyles, breakpoint.name);

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
