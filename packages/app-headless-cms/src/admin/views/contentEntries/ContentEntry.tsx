import React, { useState } from "react";
import { css } from "emotion";
import styled from "@emotion/styled";
import { Tab, Tabs } from "@webiny/ui/Tabs/index.js";
import { Elevation } from "@webiny/ui/Elevation/index.js";
import { CircularProgress } from "@webiny/ui/Progress/index.js";
import { makeDecoratable } from "@webiny/app";
import { RevisionsList } from "./ContentEntry/RevisionsList/RevisionsList.js";
import { useContentEntry } from "./hooks/useContentEntry.js";
import { Header } from "~/admin/components/ContentEntryForm/Header/index.js";
import { ContentEntryForm } from "~/admin/components/ContentEntryForm/ContentEntryForm.js";
import { usePersistEntry } from "~/admin/hooks/usePersistEntry.js";
import { type FormValidation } from "@webiny/form";
import { ValidationIndicators } from "./ValidationIndicators.js";

const DetailsContainer = styled("div")({
    height: "calc(100% - 10px)",
    overflow: "hidden",
    position: "relative",
    ".mdc-tab-bar": {
        backgroundColor: "var(--mdc-theme-surface)"
    }
});

const RenderBlock = styled("div")({
    position: "relative",
    zIndex: 0,
    backgroundColor: "var(--mdc-theme-background)",
    height: "100%",
    padding: 25
});

const elevationStyles = css({
    position: "relative"
});

declare global {
    // eslint-disable-next-line
    namespace JSX {
        interface IntrinsicElements {
            "test-id": {
                children?: React.ReactNode;
            };
        }
    }
}

export const ContentEntry = makeDecoratable("ContentEntry", () => {
    const { loading, entry, activeTab, setActiveTab } = useContentEntry();
    const [invalidFields, setInvalidFields] = useState<FormValidation | undefined>(undefined);
    const { persistEntry } = usePersistEntry({ addItemToListCache: true });

    return (
        <DetailsContainer>
            <test-id data-testid="cms-content-details">
                <Tabs id={"cms-content-details-tabs"} value={activeTab} onActivate={setActiveTab}>
                    <Tab
                        label={"Content"}
                        disabled={loading}
                        data-testid={"cms.content-form.tabs.content"}
                    >
                        <RenderBlock>
                            <Elevation z={2} className={elevationStyles}>
                                {invalidFields ? (
                                    <ValidationIndicators invalidFields={invalidFields} />
                                ) : null}
                                {loading && <CircularProgress />}
                                <ContentEntryForm
                                    entry={entry}
                                    persistEntry={persistEntry}
                                    header={<Header />}
                                    onInvalidFields={invalidFields =>
                                        setInvalidFields(invalidFields)
                                    }
                                />
                            </Elevation>
                        </RenderBlock>
                    </Tab>
                    <Tab
                        label={"Revisions"}
                        disabled={loading}
                        data-testid={"cms.content-form.tabs.revisions"}
                    >
                        <RevisionsList />
                    </Tab>
                </Tabs>
            </test-id>
        </DetailsContainer>
    );
});
