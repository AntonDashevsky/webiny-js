import { onEntryBeforeRestoreFromBinHook } from "~/hooks/entry/onEntryBeforeRestoreFromBin.hook.js";

export { onEntryBeforeRestoreFromBinHook } from "./onEntryBeforeRestoreFromBin.hook.js";

import type { HcmsAcoContext } from "~/types.js";

export const createEntryHooks = (context: HcmsAcoContext) => {
    onEntryBeforeRestoreFromBinHook(context);
};
