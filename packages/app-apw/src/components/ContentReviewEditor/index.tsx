import React from "react";
import styled from "@emotion/styled";
import { Routes, Route } from "@webiny/react-router";
import { Box, Columns } from "~/components/Layout.js";
import { useCurrentContentReview } from "~/hooks/useContentReview.js";
import { CircularProgress } from "@webiny/ui/Progress/index.js";

/**
 * Components
 */
import { ChangeRequestDialogProvider } from "./ChangeRequest/useChangeRequestDialog.js";
import { ChangeRequestDialog } from "./ChangeRequest/ChangeRequestDialog.js";
import { PanelBox } from "./Styled.js";
import { PlaceholderBox } from "./PlaceholderBox.js";
import { Header } from "./Header.js";
import { LeftPanel } from "./LeftPanel.js";
import { CenterPanel } from "./CenterPanel.js";

const EditorColumns = styled(Columns)`
    background-color: var(--mdc-theme-surface);
    padding: 65px 0 0;
`;

export const ContentReviewEditor = () => {
    const { loading, contentReview } = useCurrentContentReview();

    if (loading) {
        return <CircularProgress label={"Loading content review..."} />;
    }

    return (
        <ChangeRequestDialogProvider>
            <Box>
                <Header />
                <EditorColumns space={0}>
                    <LeftPanel
                        steps={contentReview.steps}
                        reviewRequestedOn={contentReview.createdOn}
                        reviewRequestedBy={contentReview.createdBy}
                        status={contentReview.reviewStatus}
                    />
                    <Routes>
                        <Route path={"/"}>
                            <PanelBox flex={"1 1 74%"}>
                                <PlaceholderBox
                                    text={`Click on the left side list to display step details`}
                                />
                            </PanelBox>
                        </Route>
                        <Route path={`:stepId`}>
                            <CenterPanel />
                            <ChangeRequestDialog />
                        </Route>
                    </Routes>
                </EditorColumns>
            </Box>
        </ChangeRequestDialogProvider>
    );
};
