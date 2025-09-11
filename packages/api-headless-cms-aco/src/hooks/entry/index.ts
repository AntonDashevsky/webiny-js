import { onEntryBeforeRestoreFromBinHook } from "~/hooks/entry/onEntryBeforeRestoreFromBin.hook";

export { onEntryBeforeRestoreFromBinHook } from "./onEntryBeforeRestoreFromBin.hook";

import type { HcmsAcoContext } from "~/types";

export const createEntryHooks = (context: HcmsAcoContext) => {
    onEntryBeforeRestoreFromBinHook(context);
};
