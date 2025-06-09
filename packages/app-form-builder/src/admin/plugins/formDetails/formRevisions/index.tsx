import React from "react";
import { type FbFormDetailsPluginType } from "~/types.js";
import { Tab } from "@webiny/ui/Tabs/index.js";
import { RevisionsList } from "./RevisionsList.js";

const plugin: FbFormDetailsPluginType = {
    name: "forms-form-details-revision-content-revisions",
    type: "forms-form-details-revision-content",
    render({ form, revisions, loading }) {
        return (
            <Tab
                label={"Revisions"}
                disabled={loading}
                data-testid={"fb.form-details.tab.revisions"}
            >
                <RevisionsList form={form} revisions={revisions} loading={loading} />
            </Tab>
        );
    }
};

export default plugin;
