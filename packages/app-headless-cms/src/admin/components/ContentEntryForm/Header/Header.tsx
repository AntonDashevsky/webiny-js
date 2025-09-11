import React from "react";
import { Buttons, makeDecoratable } from "@webiny/app-admin";

import { useContentEntryEditorConfig } from "~/admin/config/contentEntries/index.js";

import { ContentFormOptionsMenu } from "./ContentFormOptionsMenu/index.js";
import { RevisionSelector } from "~/admin/components/ContentEntryForm/Header/RevisionSelector/index.js";
import { Helmet } from "react-helmet";
import { useContentEntry } from "~/admin/views/contentEntries/hooks/index.js";

export const Header = makeDecoratable("ContentEntryFormHeader", () => {
    const { buttonActions } = useContentEntryEditorConfig();
    const { entry } = useContentEntry();

    return (
        <div
            className={
                "wby-flex wby-items-center wby-justify-between wby-gap-sm wby-border-b-sm wby-border-neutral-dimmed wby-pb-md wby-mb-md"
            }
            id="headerToolbarGrid"
        >
            {entry.meta?.title ? <Helmet title={entry.meta.title} /> : null}
            <RevisionSelector />
            <div className={"wby-flex wby-items-center wby-gap-sm"}>
                <Buttons actions={buttonActions} />
                <ContentFormOptionsMenu />
            </div>
        </div>
    );
});
