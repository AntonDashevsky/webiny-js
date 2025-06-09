import { onPageAfterCreateHook } from "~/page/hooks/onPageAfterCreate.hook.js";
import { onPageAfterCreateFromHook } from "~/page/hooks/onPageAfterCreateFrom.hook.js";
import { onPageAfterDeleteHook } from "~/page/hooks/onPageAfterDelete.hook.js";
import { onPageAfterPublishHook } from "~/page/hooks/onPageAfterPublish.hook.js";
import { onPageAfterUnpublishHook } from "~/page/hooks/onPageAfterUnpublish.hook.js";
import { onPageAfterUpdateHook } from "~/page/hooks/onPageAfterUpdate.hook.js";

import { type PbAcoContext } from "~/types.js";

export const createPageHooks = (context: PbAcoContext) => {
    onPageAfterCreateHook(context);
    onPageAfterCreateFromHook(context);
    onPageAfterDeleteHook(context);
    onPageAfterPublishHook(context);
    onPageAfterUnpublishHook(context);
    onPageAfterUpdateHook(context);
};

export const createImportExportPageHooks = (context: PbAcoContext) => {
    onPageAfterCreateHook(context);
    onPageAfterUpdateHook(context);
};
