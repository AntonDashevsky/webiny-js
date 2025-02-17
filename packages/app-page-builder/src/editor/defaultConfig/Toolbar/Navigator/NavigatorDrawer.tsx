import React, { useState, useEffect, createContext } from "react";
import { Typography } from "@webiny/ui/Typography/index.js";
import { Tooltip } from "@webiny/ui/Tooltip/index.js";
import { i18n } from "@webiny/app/i18n/index.js";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler.js";
import { NavigatorTitle } from "./StyledComponents.js";
import { TreeView } from "./TreeView.js";
import { ReactComponent as UnfoldMoreIcon } from "./assets/unfold_more_24px.svg";
import { ReactComponent as UnfoldLessIcon } from "./assets/unfold_less_24px.svg";
import { UpdateElementTreeActionEvent } from "~/editor/recoil/actions/index.js";
import { PbEditorElementTree } from "~/types.js";

const t = i18n.ns("app-page-builder/editor/plugins/toolbar/navigator");

interface NavigatorContextValue {
    refresh: () => Promise<void>;
    expandAll: boolean;
    setActiveElementPath: (value: string[]) => void;
    activeElementPath: string[];
}
export const NavigatorContext = createContext<NavigatorContextValue>({
    activeElementPath: [],
    refresh: async () => {
        return void 0;
    },
    expandAll: false,
    setActiveElementPath: () => {
        return void 0;
    }
});

export const NavigatorDrawer = () => {
    const [elementTree, setElementTree] = useState<PbEditorElementTree | null>(null);
    const [expandAll, setExpandAll] = useState<boolean>(false);
    const [activeElementPath, setActiveElementPath] = useState<string[]>([]);
    const eventHandler = useEventActionHandler();

    const refreshElementTree = async () => {
        try {
            const elementTree = await eventHandler.getElementTree();
            setElementTree(elementTree);
        } catch (e) {}
    };

    useEffect(() => {
        const off = eventHandler.on(UpdateElementTreeActionEvent, () => {
            refreshElementTree();

            return {
                actions: []
            };
        });

        return () => {
            off();
        };
    }, []);

    useEffect(() => {
        if (elementTree) {
            return;
        }

        refreshElementTree();
    });

    return (
        <NavigatorContext.Provider
            value={{
                refresh: refreshElementTree,
                expandAll,
                activeElementPath,
                setActiveElementPath
            }}
        >
            <NavigatorTitle>
                <Typography use={"subtitle1"}>Navigator</Typography>
                <button
                    className={"action"}
                    onClick={() => {
                        setExpandAll(!expandAll);
                    }}
                >
                    <Tooltip
                        content={t`{message}`({
                            message: expandAll ? "collapse all" : "expand all"
                        })}
                    >
                        {expandAll ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
                    </Tooltip>
                </button>
            </NavigatorTitle>
            {elementTree && <TreeView element={elementTree} level={0} />}
        </NavigatorContext.Provider>
    );
};
