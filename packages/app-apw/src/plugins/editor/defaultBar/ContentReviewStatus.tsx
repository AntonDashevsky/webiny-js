import React from "react";
import upperCase from "lodash/upperCase.js";
import { Box, Columns, Stack } from "~/components/Layout.js";
import { Circle, StatusText } from "~/views/contentReviewDashboard/components/Styled.js";
import { statusToLevel } from "~/views/contentReviewDashboard/components/ContentReviewStatus.js";
import { useCurrentContentReview } from "~/hooks/useContentReview.js";

export const ContentReviewStatus = () => {
    const { contentReview } = useCurrentContentReview();
    const { reviewStatus } = contentReview;
    const level = statusToLevel[reviewStatus];

    return (
        <Stack space={2} paddingX={4}>
            <Columns space={4}>
                <Circle active={level >= 0} />
                <Circle active={level >= 1} />
                <Circle active={level >= 2} />
            </Columns>
            <Box display={"flex"} justifyContent={"center"}>
                <StatusText>{upperCase(reviewStatus)}</StatusText>
            </Box>
        </Stack>
    );
};
