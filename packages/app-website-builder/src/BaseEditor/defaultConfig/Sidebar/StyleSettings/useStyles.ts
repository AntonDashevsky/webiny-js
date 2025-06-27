import { useCallback, useState } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { Commands } from "~/BaseEditor";
import { useActiveElement } from "~/BaseEditor/hooks/useActiveElement";
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { useBindingsForElement } from "../ElementSettings/useBindingsForElement";
import { StylesBindingsProcessor } from "~/sdk/StylesBindingsProcessor";

export const useStyles = () => {
    const [localState, setLocalValue] = useState<Record<string, any>>();
    const { breakpoint, breakpoints } = useBreakpoint();
    const [element] = useActiveElement();
    const editor = useDocumentEditor();

    // These bindings already include per-breakpoint overrides.
    const { rawBindings, resolvedBindings } = useBindingsForElement(element?.id);
    const stylesProcessor = new StylesBindingsProcessor(
        breakpoints.map(bp => bp.name),
        rawBindings
    );
    const devFriendlyStyles = stylesProcessor.toDeepStyles(resolvedBindings.bindings.styles);
    const inheritanceInfo = resolvedBindings.inheritanceInfo.styles;

    const onChange = useCallback(
        (cb: (styles: Record<string, any>) => void) => {
            if (!element) {
                return;
            }

            // Apply changes by reference.
            cb(devFriendlyStyles);

            // Apply final styles to element bindings.
            stylesProcessor.applyStyles(rawBindings, devFriendlyStyles, breakpoint.name);

            editor.updateDocument(document => {
                document.bindings[element.id] = rawBindings;
            });

            // Clear local value
            setLocalValue(undefined);
        },
        [element?.id, devFriendlyStyles, breakpoint]
    );

    const onPreviewChange = useCallback(
        (cb: (styles: Record<string, any>) => void) => {
            if (!element) {
                return;
            }

            cb(devFriendlyStyles);

            const patch = stylesProcessor.createPatch(
                rawBindings,
                devFriendlyStyles,
                breakpoint.name
            );

            setLocalValue(devFriendlyStyles);
            editor.executeCommand(Commands.PreviewPatchElement, {
                elementId: element.id,
                patch
            });
        },
        [element?.id, devFriendlyStyles, breakpoint]
    );

    return {
        styles: localState ?? devFriendlyStyles,
        inheritanceInfo,
        onChange,
        onPreviewChange
    };
};
