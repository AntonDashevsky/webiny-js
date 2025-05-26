import { useCallback, useState } from "react";
import store from "store";
import { useActiveElement } from "~/BaseEditor/hooks/useActiveElement";

const LOCAL_STORAGE_KEY = "webiny_pb_editor_active_tab";

export function useActiveGroup() {
    const [element] = useActiveElement();
    const [sidebar, setSidebar] = useState<{ activeTabIndex: string | undefined }>({
        activeTabIndex: undefined
    });

    const activeGroup = store.get(LOCAL_STORAGE_KEY, sidebar.activeTabIndex) ?? undefined;

    const setActiveGroup = useCallback(
        (name: string) => {
            setSidebar({ activeTabIndex: name });
            if (element) {
                store.set(LOCAL_STORAGE_KEY, name);
            }
        },
        [element]
    );

    return {
        activeGroup,
        setActiveGroup
    };
}
