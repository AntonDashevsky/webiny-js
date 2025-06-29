import { useCallback, useMemo, useState } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { Commands } from "~/BaseEditor";
import { useActiveElement } from "~/BaseEditor/hooks/useActiveElement";
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { useBindingsForElement } from "../ElementSettings/useBindingsForElement";
import { StylesBindingsProcessor } from "~/sdk/StylesBindingsProcessor";
import {
    BreakpointElementMetadata,
    ElementMetadata,
    IElementMetadata,
    NullElementMetadata,
    StylesMetadata
} from "~/sdk/ElementMetadata";

export type OnChangeParams = {
    styles: Record<string, any>;
    metadata: IElementMetadata;
};

export const useStyles = () => {
    const [localState, setLocalValue] = useState<Record<string, any>>();
    const { breakpoint, breakpoints } = useBreakpoint();
    const [element] = useActiveElement();
    const editor = useDocumentEditor();

    const breakpointNames = breakpoints.map(bp => bp.name);

    // These bindings already include per-breakpoint overrides.
    const { rawBindings, resolvedBindings, inheritanceMap } = useBindingsForElement(element?.id);

    const stylesProcessor = new StylesBindingsProcessor(
        element?.id ?? "",
        breakpoints.map(bp => bp.name),
        rawBindings
    );

    const elementMetadata: IElementMetadata = useMemo(() => {
        if (!element) {
            return new NullElementMetadata();
        }

        return new StylesMetadata(
            new BreakpointElementMetadata(
                breakpointNames,
                breakpoint.name,
                new ElementMetadata(element.id, rawBindings.metadata)
            )
        );
    }, [element?.id, breakpoint.name, rawBindings]);

    const devFriendlyStyles = stylesProcessor.toDeepStyles(resolvedBindings.styles);

    const onChange = useCallback(
        (cb: (params: OnChangeParams) => void) => {
            if (!element) {
                return;
            }

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
        [element?.id, devFriendlyStyles, breakpoint]
    );

    const onPreviewChange = useCallback(
        (cb: (params: OnChangeParams) => void) => {
            if (!element) {
                return;
            }

            cb({ styles: devFriendlyStyles, metadata: elementMetadata });

            setLocalValue(devFriendlyStyles);

            const updatedStyles = stylesProcessor.createUpdate(devFriendlyStyles, breakpoint.name);

            editor.executeCommand(Commands.PreviewPatchElement, {
                elementId: element.id,
                patch: updatedStyles.createJsonPatch(rawBindings)
            });
        },
        [element?.id, devFriendlyStyles, breakpoint]
    );

    return {
        styles: localState ?? devFriendlyStyles,
        metadata: elementMetadata,
        inheritanceMap: inheritanceMap.styles,
        onChange,
        onPreviewChange
    };
};
