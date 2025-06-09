import * as React from "react";
import { Form } from "@webiny/form";
import { Input } from "@webiny/ui/Input/index.js";
import { Typography } from "@webiny/ui/Typography/index.js";
import { Cell, Grid } from "@webiny/ui/Grid/index.js";
import { ButtonPrimary, ButtonSecondary } from "@webiny/ui/Button/index.js";
import { PagesAutocomplete } from "~/admin/components/PagesAutocomplete.js";
import { Elevation } from "@webiny/ui/Elevation/index.js";
import { validation } from "@webiny/validation";
import { type FormOnSubmit } from "@webiny/form/types.js";
import { type MenuTreeItem } from "~/admin/views/Menus/types.js";
import { css } from "emotion";

const menuPageFormStyle = css({
    color: "var(--mdc-theme-on-surface)",
    backgroundColor: "var(--mdc-theme-background) !important"
});

interface LinkFormProps {
    data: MenuTreeItem;
    onSubmit: FormOnSubmit;
    onCancel: () => void;
}
const LinkForm = ({ data, onSubmit, onCancel }: LinkFormProps) => {
    return (
        <Elevation z={4} className={menuPageFormStyle}>
            <Form data={data} onSubmit={onSubmit}>
                {({ submit, Bind, data, form }) => (
                    <>
                        <Grid>
                            <Cell span={12}>
                                <Typography use={"overline"}>Page menu item</Typography>
                            </Cell>
                        </Grid>

                        <Grid>
                            <Cell span={12}>
                                <Bind name="page" validators={validation.create("required")}>
                                    {({ onChange, ...rest }) => (
                                        <PagesAutocomplete
                                            {...rest}
                                            onChange={(value: string, selection: MenuTreeItem) => {
                                                onChange(value);
                                                if (!data.title && selection) {
                                                    form.setValue("title", selection.title);
                                                }
                                            }}
                                            label="Page"
                                            data-testid="pb.menu.new.pageitem.page"
                                        />
                                    )}
                                </Bind>
                            </Cell>
                        </Grid>
                        <Grid>
                            <Cell span={12}>
                                <Bind name="title" validators={validation.create("required")}>
                                    <Input label="Title" data-testid="pb.menu.new.pageitem.title" />
                                </Bind>
                            </Cell>
                        </Grid>
                        <Grid>
                            <Cell span={12}>
                                <ButtonSecondary onClick={onCancel}>Cancel</ButtonSecondary>
                                <ButtonPrimary
                                    onClick={ev => {
                                        submit(ev);
                                    }}
                                    style={{ float: "right" }}
                                    data-testid="pb.menu.new.pageitem.button.save"
                                >
                                    Save menu item
                                </ButtonPrimary>
                            </Cell>
                        </Grid>
                    </>
                )}
            </Form>
        </Elevation>
    );
};

export default LinkForm;
