import React, { useState } from "react";
import { createPortal } from "react-dom";
import { CircularProgress } from "@webiny/ui/Progress/index.js";
import { useContentEntry } from "~/admin/views/contentEntries/hooks/index.js";
import { RevisionListDrawer } from "./RevisionListDrawer/index.js";
import { FullScreenContentEntryHeaderLeft } from "./FullScreenContentEntryHeaderLeft.js";
import * as FSE from "./FullScreenContentEntry.styled.js";
import { FullScreenContentEntryProvider } from "./useFullScreenContentEntry.js";
import { ContentEntryEditorConfig } from "~/ContentEntryEditorConfig.js";
import { cmsLegacyEntryEditor } from "~/utils/cmsLegacyEntryEditor.js";
import { useContentEntryEditorConfig } from "~/admin/config/contentEntries/index.js";

const { ContentEntry } = ContentEntryEditorConfig;

const FullScreenContentEntryDecorator = ContentEntry.createDecorator(Original => {
    return function ContentEntry() {
        const { width } = useContentEntryEditorConfig();
        const { loading } = useContentEntry();
        const [isRevisionListOpen, openRevisionList] = useState<boolean>(false);

        return (
            <FullScreenContentEntryProvider
                openRevisionList={openRevisionList}
                isRevisionListOpen={isRevisionListOpen}
            >
                <FSE.Container>
                    <FSE.Header>
                        <FSE.HeaderContent style={{ width: "33%" }}>
                            <FullScreenContentEntryHeaderLeft />
                        </FSE.HeaderContent>
                        <FSE.HeaderContent>
                            {/*
                                Empty div to relocate Entry Form Header via React Portal in full-screen mode.
                                Ensures layout flexibility without disrupting React context and state.
                            */}
                            <div id={"cms-content-entry-header-right"} />
                        </FSE.HeaderContent>
                    </FSE.Header>
                    {loading && <CircularProgress style={{ zIndex: 10 }} />}
                    <FSE.Content>
                        <FSE.ContentFormWrapper>
                            <FSE.ContentFormInner width={width}>
                                <Original />
                            </FSE.ContentFormInner>
                        </FSE.ContentFormWrapper>
                    </FSE.Content>
                    <RevisionListDrawer />
                </FSE.Container>
            </FullScreenContentEntryProvider>
        );
    };
});

const FullScreenContentEntryFormDecorator = ContentEntry.ContentEntryForm.createDecorator(
    Original => {
        return function ContentEntryForm(props) {
            return <Original {...props} className={FSE.ContentFormInnerCss} />;
        };
    }
);

const FullScreenContentEntryFormHeaderDecorator =
    ContentEntry.ContentEntryForm.Header.createDecorator(Original => {
        return function ContentEntryFormHeader() {
            const headerRightElement = document.getElementById("cms-content-entry-header-right");

            if (!headerRightElement) {
                return <Original />;
            }

            return createPortal(<Original />, headerRightElement);
        };
    });

export const FullScreenContentEntry = () => {
    if (cmsLegacyEntryEditor) {
        return null;
    }

    return (
        <>
            <FullScreenContentEntryDecorator />
            <FullScreenContentEntryFormDecorator />
            <FullScreenContentEntryFormHeaderDecorator />
        </>
    );
};
