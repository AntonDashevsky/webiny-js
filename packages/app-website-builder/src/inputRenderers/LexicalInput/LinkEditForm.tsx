import React from "react";
import type { FloatingLinkEditorPlugin } from "@webiny/lexical-editor";
import { Button, Grid, Input, Switch, Text } from "@webiny/admin-ui";
import { Bind, Form } from "@webiny/form";
import { validation } from "@webiny/validation";

type LinkEditForm = NonNullable<
    React.ComponentProps<typeof FloatingLinkEditorPlugin>["LinkEditForm"]
>;
type LinkEditFormProps = React.ComponentProps<LinkEditForm>;

export const LinkEditForm = ({ linkData, onSave, onCancel }: LinkEditFormProps) => {
    const onSubmit = (data: LinkEditFormProps["linkData"]) => {
        onSave(data);
    };

    return (
        <Form data={linkData} onSubmit={onSubmit}>
            {form => (
                <div className={"wby-p-md"}>
                    <Grid>
                        <Grid.Column span={12}>
                            <Text size={"lg"}>Edit Link</Text>
                        </Grid.Column>
                        <Grid.Column span={12}>
                            <Bind name={"url"} validate={validation.create("url")}>
                                <Input label={"URL"} variant={"secondary"} />
                            </Bind>
                        </Grid.Column>
                        <Grid.Column span={12}>
                            <Bind name={"alt"}>
                                <Input label={"Alt text"} variant={"secondary"} />
                            </Bind>
                        </Grid.Column>
                        <Grid.Column span={12}>
                            <Bind name={"target"}>
                                {({ value, onChange }) => (
                                    <Switch
                                        checked={value === "_blank"}
                                        label={"Open link in a new tab"}
                                        onChange={value => {
                                            onChange(value === true ? "_blank" : null);
                                        }}
                                    />
                                )}
                            </Bind>
                        </Grid.Column>
                        <Grid.Column span={12} className={"wby-flex wby-justify-end wby-gap-sm"}>
                            <Button variant={"secondary"} text={`Cancel`} onClick={onCancel} />
                            <Button text={`Save`} onClick={e => form.submit(e)} />
                        </Grid.Column>
                    </Grid>
                </div>
            )}
        </Form>
    );
};
