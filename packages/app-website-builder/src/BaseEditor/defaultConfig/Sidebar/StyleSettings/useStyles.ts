import { useCallback, useMemo, useRef, useState } from "react";
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
    const { breakpoint, breakpoints } = useBreakpoint();
    const editor = useDocumentEditor();
    const [, setCount] = useState(0);
    const localRef = useRef<any>();

    const rerender = useCallback(() => {
        setCount(count => count + 1);
    }, []);

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

    const onChange = (cb: (params: OnChangeParams) => void) => {
        const styles = new StylesValueObject(devFriendlyStyles);

        // Apply changes by reference.
        cb({ styles, metadata: elementMetadata });

        const finalStyles = styles.getAll();

        // Apply final styles to element bindings.
        const updatedStyles = stylesProcessor.createUpdate(finalStyles, breakpoint.name);

        localRef.current = undefined;

        editor.updateDocument(document => {
            updatedStyles.applyToDocument(document);
            elementMetadata.applyToDocument(document);
        });
    };

    const onPreviewChange = (cb: (params: OnChangeParams) => void) => {
        const stylesProcessor = new StylesBindingsProcessor(
            elementId,
            breakpoints.map(bp => bp.name),
            structuredClone(rawBindings)
        );

        const styles = new StylesValueObject(structuredClone(devFriendlyStyles));

        cb({ styles, metadata: elementMetadata });

        const finalStyles = styles.getAll();

        // For preview, we need to store a local copy of styles, to avoid updating editor state.
        localRef.current = finalStyles;

        const updatedStyles = stylesProcessor.createUpdate(finalStyles, breakpoint.name);


        // Since we're not updating state, force re-render of the consumers.
        rerender();

        editor.executeCommand(Commands.PreviewPatchElement, {
            elementId,
            patch: updatedStyles.createJsonPatch(rawBindings)
        });
    };

    return {
        styles: localRef.current ?? devFriendlyStyles,
        metadata: elementMetadata,
        inheritanceMap: inheritanceMap.styles,
        onChange,
        onPreviewChange
    };
};
