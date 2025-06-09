import styled from "@emotion/styled";
import { Typography, type TypographyProps } from "@webiny/ui/Typography/index.js";

export const Name = styled(Typography)<TypographyProps>`
    padding-left: 16px;
    line-height: 48px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
