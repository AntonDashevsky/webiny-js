import { onFolderBeforeDeleteAcoHook } from "~/folder/onFolderBeforeDeleteAco.hook.js";
import { onFolderBeforeDeleteHcmsHook } from "~/folder/onFolderBeforeDeleteHcms.hook.js";
import { onFolderBeforeDeleteFmHook } from "~/folder/onFolderBeforeDeleteFm.hook.js";

import { AcoContext } from "~/types.js";

export const createAcoHooks = (context: AcoContext) => {
    onFolderBeforeDeleteAcoHook(context);
    onFolderBeforeDeleteHcmsHook(context);
    onFolderBeforeDeleteFmHook(context);
};
