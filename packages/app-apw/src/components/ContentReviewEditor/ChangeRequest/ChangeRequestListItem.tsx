import React from "react";
import { useLocation, useNavigate } from "@webiny/react-router";
import styled from "@emotion/styled";
import { Typography } from "@webiny/ui/Typography/index.js";
import { Box, Columns, Stack } from "~/components/Layout.js";
import { Avatar } from "~/views/publishingWorkflows/components/ReviewersList.js";
import { RichTextEditor } from "@webiny/app-admin/components/RichTextEditor/index.js";
import { fromNow } from "~/utils.js";
import {
    ChangeRequestItem,
    richTextWrapperStyles,
    TypographySecondary,
    TypographyTitle
} from "../Styled.js";
import { type ApwChangeRequest, ApwChangeRequestStatus } from "~/types.js";
import { getTrimmedBody } from "./utils.js";

const statusToBackgroundColor = {
    [ApwChangeRequestStatus.RESOLVED]: "var(--mdc-theme-secondary)",
    [ApwChangeRequestStatus.ACTIVE]: "var(--mdc-theme-primary)",
    [ApwChangeRequestStatus.PENDING]: "var(--mdc-theme-on-background)"
};

const StatusBadge = styled.div<{ status: ApwChangeRequestStatus }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => statusToBackgroundColor[props.status]};
`;

const getRandomIndex = () => Math.round(Math.random() * 100) % 3;

type ChangeRequestItemProps = ApwChangeRequest;

export const ChangeRequestListItem = (props: ChangeRequestItemProps) => {
    const { createdOn, createdBy, title, id, body, resolved } = props;
    const location = useLocation();
    const navigate = useNavigate();

    const status = resolved ? ApwChangeRequestStatus.RESOLVED : ApwChangeRequestStatus.ACTIVE;
    /**
     * Get active "changeRequestId" from pathname.
     */
    const tokens = location.pathname.split("/");
    const activeChangeRequestId = tokens[tokens.length - 1];

    return (
        <ChangeRequestItem
            onClick={() => navigate(encodeURIComponent(id))}
            selected={encodeURIComponent(id) === activeChangeRequestId}
        >
            <Stack space={1} width={"100%"}>
                <Columns space={1} justifyContent={"space-between"}>
                    <Columns space={2.5} alignItems={"center"}>
                        <Box>
                            <Avatar index={getRandomIndex()} />
                        </Box>
                        <Box>
                            <Typography use={"subtitle1"} style={{ textTransform: "capitalize" }}>
                                {createdBy.displayName}
                            </Typography>
                        </Box>
                    </Columns>
                    <Box display={"flex"} alignItems={"center"}>
                        <TypographySecondary use={"caption"}>
                            {fromNow(createdOn)}
                        </TypographySecondary>
                    </Box>
                </Columns>
                <Columns
                    space={1}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    paddingTop={1}
                >
                    <Box>
                        <TypographyTitle use={"body2"}>{title}</TypographyTitle>
                    </Box>
                    <Box>
                        <StatusBadge status={status} />
                    </Box>
                </Columns>
                <Box>
                    <TypographySecondary use={"caption"} tag={"div"}>
                        <RichTextEditor
                            readOnly={true}
                            className={richTextWrapperStyles}
                            value={getTrimmedBody(body)}
                        />
                    </TypographySecondary>
                </Box>
            </Stack>
        </ChangeRequestItem>
    );
};
