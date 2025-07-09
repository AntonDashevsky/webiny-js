import React from "react";
import { Grid, Input } from "@webiny/admin-ui";
import { UnsetOnUnmount, useBind } from "@webiny/form";
import { validation } from "@webiny/validation";

export const StaticPageForm = () => {
    const titleBind = useBind({ name: "title", validators: [validation.create("required")] });
    const pathBind = useBind({ name: "path", validators: [validation.create("required")] });

    return (
        <>
            <Grid.Column span={12}>
                <UnsetOnUnmount name={"title"}>
                    <Input label={"Title"} {...titleBind} />
                </UnsetOnUnmount>
            </Grid.Column>
            <Grid.Column span={12}>
                <UnsetOnUnmount name={"path"}>
                    <Input label={"Path"} {...pathBind} />
                </UnsetOnUnmount>
            </Grid.Column>
        </>
    );
};
