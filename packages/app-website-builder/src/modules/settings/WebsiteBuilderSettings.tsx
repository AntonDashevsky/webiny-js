import { Grid, Input } from "@webiny/admin-ui";
import React from "react";

export const WebsiteBuilderSettings = () => {
    return (
        <Grid>
            <Grid.Column span={12}>
                <Input label={"Preview Domain"} description={"This domain will be used in the page editor."}/>
            </Grid.Column>
        </Grid>
    )
}
