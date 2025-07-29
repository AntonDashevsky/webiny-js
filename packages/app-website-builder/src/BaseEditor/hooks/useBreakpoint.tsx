import type React from "react";
import { useCallback, useMemo } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { useSelectFromEditor } from "~/BaseEditor/hooks/useSelectFromEditor";
import type { Breakpoint } from "@webiny/website-builder-sdk";
import { BASE_BREAKPOINT } from "~/constants";
import { useWebsiteBuilderTheme } from "~/BaseEditor/components";

export type EditorBreakpoint = Breakpoint & {
    title: string;
    description: string;
    icon: React.ReactNode;
};

export const useBreakpoint = () => {
    const { theme } = useWebsiteBuilderTheme();
    const breakpoints = theme?.breakpoints ?? [];

    const editor = useDocumentEditor();
    const activeBreakpoint = useSelectFromEditor<string>(state => {
        return state.breakpoint ?? breakpoints[0]?.name ?? "desktop";
    });

    const breakpoint = useMemo(() => {
        const bp = breakpoints.find(bp => bp.name === activeBreakpoint);
        return (
            bp ?? {
                name: BASE_BREAKPOINT,
                maxWidth: 4000
            }
        );
    }, [activeBreakpoint, breakpoints]);

    const setBreakpoint = useCallback(
        (mode: string) => {
            editor.updateEditor(state => {
                state.breakpoint = mode;
            });
        },
        [editor]
    );

    return {
        isBaseBreakpoint: breakpoint.name === BASE_BREAKPOINT,
        breakpoint,
        breakpoints,
        setBreakpoint
    };
};
