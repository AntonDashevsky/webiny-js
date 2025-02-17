import React from "react";
import { Typography } from "../../Typography/index.js";
import styled from "@emotion/styled";

const NoDataWrapper = styled("div")({
    textAlign: "center",
    padding: 100,
    color: "var(--mdc-theme-on-surface)"
});

const NoData = () => (
    <NoDataWrapper>
        <Typography use="overline">No records found.</Typography>
    </NoDataWrapper>
);

export default NoData;
