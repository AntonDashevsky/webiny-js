import {
    onBlockAfterCreateHook,
    onBlockAfterUpdateHook,
    onBlockAfterDeleteHook,
    onBlocksAfterExportHook,
    onBlocksAfterImportHook
} from "./blocks.js";
import {
    onBlockCategoryAfterCreateHook,
    onBlockCategoryAfterUpdateHook,
    onBlockCategoryAfterDeleteHook
} from "./blockCategories.js";
import { onPageAfterCreateHook, onPagesAfterExportHook, onPagesAfterImportHook } from "./pages.js";
import {
    onPageRevisionAfterCreateHook,
    onPageRevisionAfterUpdateHook,
    onPageRevisionAfterDeleteHook,
    onPageRevisionAfterPublishHook,
    onPageRevisionAfterUnpublishHook
} from "./pageRevisions.js";
import {
    onPageElementAfterCreateHook,
    onPageElementAfterUpdateHook,
    onPageElementAfterDeleteHook
} from "./pageElements.js";
import {
    onCategoryAfterCreateHook,
    onCategoryAfterUpdateHook,
    onCategoryAfterDeleteHook
} from "./categories.js";
import {
    onTemplateAfterCreateHook,
    onTemplateAfterUpdateHook,
    onTemplateAfterDeleteHook,
    onTemplatesAfterExportHook,
    onTemplatesAfterImportHook
} from "./templates.js";
import { onMenuAfterCreateHook, onMenuAfterUpdateHook, onMenuAfterDeleteHook } from "./menus.js";
import { onSettingsAfterUpdateHook } from "./settings.js";

import { type AuditLogsContext } from "~/types.js";

export const createPageBuilderHooks = (context: AuditLogsContext) => {
    onBlockAfterCreateHook(context);
    onBlockAfterUpdateHook(context);
    onBlockAfterDeleteHook(context);
    onBlocksAfterExportHook(context);
    onBlocksAfterImportHook(context);
    onBlockCategoryAfterCreateHook(context);
    onBlockCategoryAfterUpdateHook(context);
    onBlockCategoryAfterDeleteHook(context);
    onPageAfterCreateHook(context);
    onPagesAfterExportHook(context);
    onPagesAfterImportHook(context);
    onPageRevisionAfterCreateHook(context);
    onPageRevisionAfterUpdateHook(context);
    onPageRevisionAfterDeleteHook(context);
    onPageRevisionAfterPublishHook(context);
    onPageRevisionAfterUnpublishHook(context);
    onPageElementAfterCreateHook(context);
    onPageElementAfterUpdateHook(context);
    onPageElementAfterDeleteHook(context);
    onCategoryAfterCreateHook(context);
    onCategoryAfterUpdateHook(context);
    onCategoryAfterDeleteHook(context);
    onTemplateAfterCreateHook(context);
    onTemplateAfterUpdateHook(context);
    onTemplateAfterDeleteHook(context);
    onTemplatesAfterExportHook(context);
    onTemplatesAfterImportHook(context);
    onMenuAfterCreateHook(context);
    onMenuAfterUpdateHook(context);
    onMenuAfterDeleteHook(context);
    onSettingsAfterUpdateHook(context);
};
