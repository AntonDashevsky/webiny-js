import styled from "@emotion/styled";
import React from "react";
import { Box, Stack } from "~/components/Layout.js";
import { ButtonIcon, ButtonPrimary, ButtonDefault } from "@webiny/ui/Button/index.js";
import { ReactComponent as CheckIcon } from "~/assets/icons/check_24dp.svg";
import { ApwContentReview, ApwContentReviewStatus } from "~/types.js";

import { i18n } from "@webiny/app/i18n/index.js";
import { Tooltip } from "@webiny/ui/Tooltip/index.js";
import { usePublishContent } from "~/hooks/usePublishContent.js";
import { CircularProgress } from "@webiny/ui/Progress/index.js";
import { useScheduleActionDialog } from "./useScheduleActionDialog.js";
import { Typography } from "@webiny/ui/Typography/index.js";
import { useCurrentContentReview } from "~/hooks/useContentReview.js";
import { formatDatetime } from "~/utils.js";

const t = i18n.ns("app-apw/content-reviews/editor/steps/publishContent");

const ContentStatusContainer = styled(Stack)`
    border-top: 1px solid var(--mdc-theme-background);
`;

const PublishContentBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 56px;
    border-top: 1px solid var(--mdc-theme-background);
`;

const defaultButtonStyles = { width: "217px" };
const activeButtonStyles = { backgroundColor: "var(--mdc-theme-secondary)" };

export const ChangeContentStatusButton = () => {
    const { contentReview } = useCurrentContentReview();
    const { loading, deleteScheduledAction } = usePublishContent();
    const { setAction, setOpenPublishNowDialog } = useScheduleActionDialog();
    const disabledButtonTooltip = t`Content can only be published once all sign offs have been provided.`;
    const alreadyPublishedMessage = t`Content has been already published.`;

    const handlePublishContent = () => {
        setAction("publish");
        setOpenPublishNowDialog(true);
    };
    const handleUnpublishContent = () => {
        setAction("unpublish");
        setOpenPublishNowDialog(true);
    };

    if (loading) {
        return <CircularProgress label={"Loading"} />;
    }
    /**
     * If the content is "underReview" render disabled action button with tooltip.
     */
    if (contentReview.reviewStatus === ApwContentReviewStatus.UNDER_REVIEW) {
        return (
            <PublishContentBox paddingX={5}>
                <Tooltip
                    content={
                        contentReview.reviewStatus === ApwContentReviewStatus.UNDER_REVIEW
                            ? disabledButtonTooltip
                            : alreadyPublishedMessage
                    }
                >
                    <ButtonPrimary style={defaultButtonStyles} disabled={true}>
                        <ButtonIcon icon={<CheckIcon />} />
                        {t` Publish Content`}
                    </ButtonPrimary>
                </Tooltip>
            </PublishContentBox>
        );
    }

    /**
     * If an action has been scheduled for the content. Render content status and "Unset schedule" CTA.
     */
    if (contentReview.content.scheduledOn) {
        return (
            <>
                <ContentStatus content={contentReview.content} />
                <PublishContentBox>
                    <ButtonDefault style={defaultButtonStyles} onClick={deleteScheduledAction}>
                        <ButtonIcon icon={<CheckIcon />} />
                        {t`Unset schedule`}
                    </ButtonDefault>
                </PublishContentBox>
            </>
        );
    }
    /**
     * If the content has already been published, render content status and "unpublish" CTA.
     */
    if (contentReview.reviewStatus === ApwContentReviewStatus.PUBLISHED) {
        return (
            <>
                <ContentStatus content={contentReview.content} />
                <PublishContentBox paddingX={5}>
                    <ButtonDefault style={defaultButtonStyles} onClick={handleUnpublishContent}>
                        <ButtonIcon icon={<CheckIcon />} />
                        {t`Un-Publish Content`}
                    </ButtonDefault>
                </PublishContentBox>
            </>
        );
    }

    /**
     * Render "publish" CTA.
     */
    return (
        <PublishContentBox paddingX={5}>
            <ButtonPrimary
                style={{ ...defaultButtonStyles, ...activeButtonStyles }}
                onClick={handlePublishContent}
            >
                <ButtonIcon icon={<CheckIcon />} />
                {t` Publish Content`}
            </ButtonPrimary>
        </PublishContentBox>
    );
};

const TypographySecondary = styled(Typography)`
    color: var(--mdc-theme-text-secondary-on-background);
`;

const AuthorName = styled(TypographySecondary)`
    color: var(--mdc-theme-text-secondary-on-background);
    text-transform: capitalize;
`;

export type ContentStatusProps = Pick<ApwContentReview, "content">;

export const ContentStatus = ({ content }: ContentStatusProps) => {
    const label = content.scheduledOn ? t`Content Scheduled On:` : t`Content Published On:`;
    const name = content.scheduledOn
        ? content.scheduledBy?.displayName
        : content.publishedBy?.displayName;
    const datetime = content.scheduledOn ? content.scheduledOn : content.publishedOn;

    return (
        <ContentStatusContainer space={0} paddingTop={4} paddingX={4} paddingBottom={2}>
            <Box>
                <Typography use={"overline"}>{label}</Typography>
                <br />
                <TypographySecondary use={"caption"}>
                    {t`{datetime} UTC`({
                        datetime: formatDatetime(datetime || "")
                    })}
                </TypographySecondary>
            </Box>
            <Box>
                <Typography use={"overline"}>{t`By:`}</Typography>&nbsp;
                <AuthorName use={"caption"}>{name}</AuthorName>
            </Box>
        </ContentStatusContainer>
    );
};
