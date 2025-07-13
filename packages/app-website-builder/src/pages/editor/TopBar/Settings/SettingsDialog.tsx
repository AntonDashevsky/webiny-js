import React from "react";
import { Dialog, Tabs, Grid, Input, MultiAutoComplete } from "@webiny/admin-ui";
import { ReactComponent as SettingsIcon } from "@webiny/icons/settings.svg";
import { ReactComponent as SeoIcon } from "@webiny/icons/search.svg";
import { Bind, Form } from "@webiny/form";
import { KeyValueGridEditor } from "./KeyValueGridEditor";

export const SettingsDialog = ({
    open,
    onClose,
    onSave
}: {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
}) => {
    return (
        <Dialog
            open={open}
            onOpenChange={() => onClose()}
            title="Page Settings"
            description="This dialog contain various page related settings."
            dismissible={false}
            actions={
                <>
                    <Dialog.CancelButton />
                    <Dialog.ConfirmButton text={"Save Settings"} onClick={onSave} />
                </>
            }
        >
            <Form
                data={{
                    title: "Product Page",
                    programmaticId: "kibo-product-page",
                    previewPath: "/product/{productCode}"
                }}
            >
                {() => {
                    return (
                        <Tabs
                            tabs={[
                                <Tabs.Tab
                                    key={"general"}
                                    value={"general"}
                                    trigger={"General"}
                                    icon={<SettingsIcon />}
                                    content={<GeneralSettingsForm />}
                                />,
                                <Tabs.Tab
                                    key={"seo"}
                                    value={"seo"}
                                    trigger={"SEO"}
                                    icon={<SeoIcon />}
                                    content={<SeoSettingsForm />}
                                />
                            ]}
                        />
                    );
                }}
            </Form>
        </Dialog>
    );
};

const GeneralSettingsForm = () => {
    return (
        <Grid className={"wby-mt-md"}>
            <Grid.Column span={12}>
                <Bind name={"title"}>
                    <Input label={"Page title"} />
                </Bind>
            </Grid.Column>
            <Grid.Column span={12}>
                <Bind name={"programmaticId"}>
                    <Input label={"Programmatic ID"} />
                </Bind>
            </Grid.Column>
            <Grid.Column span={12}>
                <Bind name={"previewPath"}>
                    <Input label={"Preview Path"} />
                </Bind>
            </Grid.Column>
            <Grid.Column span={12}>
                <Bind name={"tags"}>
                    {({ value, onChange }) => (
                        // TODO: why is this prop called `onValuesChange` and not `onChange`
                        <MultiAutoComplete
                            label={"Tags"}
                            options={[]}
                            allowFreeInput
                            value={value}
                            onValuesChange={onChange}
                        />
                    )}
                </Bind>
            </Grid.Column>
        </Grid>
    );
};

const SeoSettingsForm = () => {
    return <KeyValueGridEditor />;
};
