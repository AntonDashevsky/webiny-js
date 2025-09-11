import React from "react";
import { Grid, Input, Select } from "@webiny/admin-ui";
import { pagePathFromTitle } from "@webiny/app-website-builder";
import type { FormAPI } from "@webiny/form";
import { Bind, UnsetOnUnmount, useForm } from "@webiny/form";
import { validation } from "@webiny/validation";

const generatePath = (form: FormAPI) => () => {
    const title = form.getValue("properties.title");
    const language = form.getValue("properties.language");

    const titlePath = pagePathFromTitle(title ?? "");
    const parts = [language, titlePath].filter(Boolean);

    form.setValue("properties.path", `/${parts.join("/")}`);
};

export const RetailPageForm = () => {
    const form = useForm();

    return (
        <>
            <Grid.Column span={12}>
                <UnsetOnUnmount name={"properties.title"}>
                    <Bind name={"properties.title"} validators={[validation.create("required")]}>
                        <Input label={"Title"} onBlur={generatePath(form)} />
                    </Bind>
                </UnsetOnUnmount>
            </Grid.Column>
            <Grid.Column span={12}>
                <UnsetOnUnmount name={"properties.language"}>
                    <Bind
                        name={"properties.language"}
                        validators={[validation.create("required")]}
                        afterChange={generatePath(form)}
                    >
                        <Select
                            placeholder={"Select a language"}
                            label={"Language"}
                            options={[
                                { label: "English", value: "en" },
                                { label: "German", value: "de" },
                                { label: "French", value: "fr" }
                            ]}
                        />
                    </Bind>
                </UnsetOnUnmount>
            </Grid.Column>
            <Grid.Column span={12}>
                <UnsetOnUnmount name={"properties.path"}>
                    <Bind name={"properties.path"} validators={[validation.create("required")]}>
                        <Input label={"Path"} />
                    </Bind>
                </UnsetOnUnmount>
            </Grid.Column>
        </>
    );
};
