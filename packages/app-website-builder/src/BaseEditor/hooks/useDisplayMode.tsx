import React, { useCallback, useMemo } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { useSelectFromEditor } from "~/BaseEditor/hooks/useSelectFromEditor";
import { DisplayMode } from "~/sdk/types";
import { ReactComponent as LaptopIcon } from "@webiny/icons/laptop_mac.svg";
import { ReactComponent as TabletIcon } from "@webiny/icons/tablet_mac.svg";
import { ReactComponent as MobileIcon } from "@webiny/icons/phone_iphone.svg";

const DISPLAY_MODES: DisplayMode[] = [
    {
        name: "desktop",
        title: "Desktop",
        description: `Desktop styles apply at all breakpoints, unless they're edited at a smaller breakpoint. Start your styling here.`,
        icon: <LaptopIcon />,
        minWidth: 0,
        maxWidth: 4000
    },
    {
        name: "tablet",
        title: "Tablet",
        description: `Styles added here will apply at 991px and down, unless they're edited at a smaller breakpoint.`,
        icon: <TabletIcon />,
        minWidth: 0,
        maxWidth: 991
    },
    {
        name: "mobile-landscape",
        title: "Mobile Landscape",
        description: `Styles added here will apply at 767px and down, unless they're edited at a smaller breakpoint.`,
        icon: <MobileIcon className={"wby-rotate-90"}/>,
        minWidth: 0,
        maxWidth: 767
    },
    {
        name: "mobile-portrait",
        title: "Mobile Portrait",
        description: `Styles added here will apply at 478px and down.`,
        icon: <MobileIcon  />,
        minWidth: 0,
        maxWidth: 478
    }
];

export const useDisplayMode = () => {
    const editor = useDocumentEditor();
    const activeMode = useSelectFromEditor<string>(state => {
        return state.displayMode || DISPLAY_MODES[0].name;
    });

    const displayMode = useMemo(() => {
        return DISPLAY_MODES.find(mode => mode.name === activeMode)!;
    }, [activeMode]);

    const setDisplayMode = useCallback(
        (mode: string) => {
            editor.updateEditor(state => {
                state.displayMode = mode;
            });
        },
        [editor]
    );

    return {
        displayMode,
        displayModes: DISPLAY_MODES,
        setDisplayMode
    };
};
