import React from "react";
import styled from "@emotion/styled";
import { Typography as BaseTypography, type TypographyProps } from "@webiny/ui/Typography/index.js";

const Typography = (props: TypographyProps) => {
    return <BaseTypography tag={"span"} {...props} />;
};

export const Text = styled(Typography)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
