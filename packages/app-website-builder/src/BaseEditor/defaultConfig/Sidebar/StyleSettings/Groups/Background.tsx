import React from "react";
import { Accordion, Grid } from "@webiny/admin-ui";
import { BackgroundImage } from "./Background/BackgroundImage";
import { BackgroundColor } from "./Background/BackgroundColor";
import { BackgroundPosition } from "./Background/BackgroundPosition";
import { BackgroundScaling } from "./Background/BackgroundScaling";

interface BackgroundProps {
    elementId: string;
}

export const Background = ({ elementId }: BackgroundProps) => {
    return (
        <Accordion.Item title={"Background"} description={"Set color and image background"}>
            <Grid>
                <Grid.Column span={12}>
                    <BackgroundColor elementId={elementId} />
                </Grid.Column>
                <Grid.Column span={12}>
                    <BackgroundImage elementId={elementId} />
                </Grid.Column>
                <Grid.Column span={12}>
                    <BackgroundPosition elementId={elementId} />
                </Grid.Column>
                <Grid.Column span={12}>
                    <BackgroundScaling elementId={elementId} />
                </Grid.Column>
            </Grid>
        </Accordion.Item>
    );
};
