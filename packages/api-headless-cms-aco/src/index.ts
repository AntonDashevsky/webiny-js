import { ContextPlugin } from "@webiny/api";
import { createEntryHooks } from "~/hooks/entry/index.js";
import type { HcmsAcoContext } from "~/types.js";

export const createAcoHcmsContext = () => {
    const plugin = new ContextPlugin<HcmsAcoContext>(async context => {
        if (!context.aco) {
            return;
        }
        createEntryHooks(context);
    });

    plugin.name = "hcms-aco.createContext";

    return plugin;
};

export * from "./plugins/index.js";
