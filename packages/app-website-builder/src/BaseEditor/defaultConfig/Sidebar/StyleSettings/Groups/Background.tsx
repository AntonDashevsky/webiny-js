import React from "react";
import { Accordion, Grid } from "@webiny/admin-ui";
import { BackgroundImage } from "./Background/BackgroundImage";
import { BackgroundColor } from "./Background/BackgroundColor";
import { BackgroundPosition } from "./Background/BackgroundPosition";
import { BackgroundScaling } from "./Background/BackgroundScaling";

export const Background = () => {
    return (
        <Accordion.Item title={"Background"}>
            <Grid>
                <Grid.Column span={12}>
                    <BackgroundColor />
                </Grid.Column>
                <Grid.Column span={12}>
                    <BackgroundImage />
                </Grid.Column>
                <Grid.Column span={12}>
                    <BackgroundPosition />
                </Grid.Column>
                <Grid.Column span={12}>
                    <BackgroundScaling />
                </Grid.Column>
            </Grid>
        </Accordion.Item>
    );
};
