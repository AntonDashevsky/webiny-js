import React from "react";
import { Compose, MenuItemRenderer, Plugins, useWcp } from "@webiny/app-admin";
/**
 * Plugins for "page builder"
 */
import { ApwOnPublish } from "./plugins/pageBuilder/ApwOnPublish.js";
import { ApwOnPageDelete } from "./plugins/pageBuilder/ApwOnDelete.js";
import { DecoratePagePublishActions } from "./plugins/pageBuilder/DecoratePagePublishActions.js";

import { ApwPageBuilderWorkflowScope } from "~/views/publishingWorkflows/components/pageBuilder/ApwPageBuilderWorkflowScope.js";
/**
 * Plugins for "Headless CMS"
 */
import { ApwOnEntryDelete } from "~/plugins/cms/ApwOnEntryDelete.js";
import { ApwOnEntryPublish } from "~/plugins/cms/ApwOnEntryPublish.js";
import { PublishEntryRevisionListItem } from "@webiny/app-headless-cms/admin/views/contentEntries/ContentEntry/RevisionsList/PublishEntryRevisionListItem.js";
import { ApwHeadlessCmsWorkflowScope } from "~/views/publishingWorkflows/components/cms/ApwHeadlessCmsWorkflowScope.js";
import { DecoratePublishEntryAction, EntryRevisionListItem } from "~/plugins/cms/PublishEntryHocs.js";
/**
 *
 */
import { Module } from "~/plugins/Module.js";
import { WorkflowScope } from "~/views/publishingWorkflows/components/WorkflowScope.js";
import { DefaultBar } from "~/plugins/editor/defaultBar/index.js";
import { MenuGroupRenderer } from "~/plugins/cms/MenuGroupRenderer.js";
import { ApwPermissions } from "~/plugins/permissionRenderer/index.js";
import { ContentEntryEditorConfig } from "@webiny/app-headless-cms";

export const AdvancedPublishingWorkflow = () => {
    const { canUseFeature } = useWcp();

    if (!canUseFeature("advancedPublishingWorkflow")) {
        return null;
    }
    return (
        <>
            <Compose
                with={[ApwPageBuilderWorkflowScope, ApwHeadlessCmsWorkflowScope]}
                component={WorkflowScope}
            />
            <Compose with={MenuGroupRenderer} component={MenuItemRenderer} />
            <ContentEntryEditorConfig>
                <DecoratePublishEntryAction />
                <Compose with={EntryRevisionListItem} component={PublishEntryRevisionListItem} />
                <ApwOnEntryDelete />
                <ApwOnEntryPublish />
            </ContentEntryEditorConfig>
            <Plugins>
                <DefaultBar />
                <Module />
                <DecoratePagePublishActions />
                <ApwOnPublish />
                <ApwOnPageDelete />
                <ApwPermissions />
            </Plugins>
        </>
    );
};
