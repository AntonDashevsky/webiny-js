import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler.js";
import { useKeyHandler } from "~/editor/hooks/useKeyHandler.js";
import { UpdateDocumentActionEvent } from "~/editor/recoil/actions/index.js";
import { usePage } from "~/pageEditor/hooks/usePage.js";
import { UpdatedPage } from "~/pageEditor/config/eventActions/saveRevision/types.js";
import { usePageSettings as usePageSettingsState } from "~/pageEditor/config/TopBar/PageSettings/usePageSettings.js";
import { PbPageData } from "~/types.js";

export type UsePageSettings = ReturnType<typeof usePageSettings>;

export function usePageSettings() {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const eventActionHandler = useEventActionHandler();
    const [pageData, setPageData] = usePage();
    const { closeSettings } = usePageSettingsState();

    const { showSnackbar } = useSnackbar();
    const { removeKeyHandler, addKeyHandler } = useKeyHandler();

    const savePage = useCallback((pageValue: Partial<PbPageData>) => {
        eventActionHandler.trigger(
            new UpdateDocumentActionEvent({
                document: pageValue,
                debounce: false,
                history: false,
                onFinish: (page?: UpdatedPage) => {
                    showSnackbar("Settings saved!");
                    closeSettings();
                    if (page) {
                        setPageData(state => ({ ...state, ...page }));
                    }
                }
            })
        );
    }, []);

    useEffect(() => {
        addKeyHandler("escape", e => {
            e.preventDefault();
            closeSettings();
        });

        return () => removeKeyHandler("escape");
    });

    return { setActiveSection, activeSection, savePage, closeSettings, pageData };
}
