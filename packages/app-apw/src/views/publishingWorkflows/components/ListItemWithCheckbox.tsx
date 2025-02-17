import React from "react";
import { Cell, Grid } from "@webiny/ui/Grid/index.js";
import { restGridStyles } from "~/views/publishingWorkflows/components/Styled.js";
import { Box } from "~/components/Layout.js";
import { Typography } from "@webiny/ui/Typography/index.js";
import { Checkbox } from "@webiny/ui/Checkbox/index.js";
import styled from "@emotion/styled";

interface ListItemWithCheckboxProps {
    label: string | React.ReactElement;
    value: boolean;
    onChange: () => void;
}

const CheckboxWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
`;

export const ListItemWithCheckbox = ({ label, value, onChange }: ListItemWithCheckboxProps) => {
    return (
        <Grid className={restGridStyles}>
            <Cell span={6} align={"middle"}>
                {typeof label === "string" ? (
                    <Box>
                        <Typography use={"subtitle1"}>{label}</Typography>
                    </Box>
                ) : (
                    label
                )}
            </Cell>
            <Cell span={6}>
                <CheckboxWrapper>
                    <Checkbox value={value} onClick={onChange} />
                </CheckboxWrapper>
            </Cell>
        </Grid>
    );
};
