import styled from "@emotion/styled";
import type { TypographyProps } from "@webiny/ui/Typography";
import { Typography } from "@webiny/ui/Typography";

export const Name = styled(Typography)<TypographyProps>`
    padding-left: 16px;
    line-height: 48px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
