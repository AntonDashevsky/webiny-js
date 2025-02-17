import React, { useRef } from "react";
import styled from "@emotion/styled";
import { useCurrentChangeRequestId } from "~/hooks/useCurrentChangeRequestId.js";
import { Box, Stack } from "~/components/Layout.js";
import { PanelBox } from "./Styled.js";
import ChangeRequest from "./ChangeRequest/ChangeRequest.js";
import { Comments } from "./Comment/Comments.js";
import { CommentBox } from "./Comment/CommentBox.js";

const RightPanelStack = styled(PanelBox)`
    display: flex;
    flex-direction: column;
`;

const CommentStack = styled(Stack)`
    display: flex;
    flex-direction: column;
`;

export const RightPanel = () => {
    const changeRequestId = useCurrentChangeRequestId();
    const ref = useRef<HTMLDivElement>(null);

    /**
     * After adding a comment we scroll the comments list to the bottom,
     * so that the latest comment is always visible.
     */
    const scrollToLatestComment = (): void => {
        if (!ref.current || typeof ref.current.scrollIntoView !== "function") {
            return;
        }
        ref.current.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    };

    if (!changeRequestId) {
        return (
            <PanelBox flex={"1 1 52%"}>
                <Box>Placeholder</Box>
            </PanelBox>
        );
    }
    return (
        <RightPanelStack flex={"1 1 52%"}>
            <ChangeRequest id={changeRequestId} />
            <CommentStack space={0}>
                <Comments ref={ref} />
                <CommentBox scrollToLatestComment={scrollToLatestComment} />
            </CommentStack>
        </RightPanelStack>
    );
};
