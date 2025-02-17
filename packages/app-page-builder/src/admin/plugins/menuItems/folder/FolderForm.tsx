import * as React from "react";
import { Form } from "@webiny/form";
import { Input } from "@webiny/ui/Input/index.js";
import { Typography } from "@webiny/ui/Typography/index.js";
import { Grid, Cell } from "@webiny/ui/Grid/index.js";
import { ButtonSecondary, ButtonPrimary } from "@webiny/ui/Button/index.js";
import { Elevation } from "@webiny/ui/Elevation/index.js";
import { validation } from "@webiny/validation";
import { FormOnSubmit } from "@webiny/form/types.js";
import { MenuTreeItem } from "~/admin/views/Menus/types.js";
import { css } from "emotion";

const menuFolderFormStyle = css({
    color: "var(--mdc-theme-on-surface)",
    backgroundColor: "var(--mdc-theme-background) !important"
});

interface FolderFormProps {
    data: MenuTreeItem;
    onSubmit: FormOnSubmit;
    onCancel: () => void;
}
const FolderForm = ({ data, onSubmit, onCancel }: FolderFormProps) => {
    return (
        <Elevation z={4} className={menuFolderFormStyle}>
            <Form data={data} onSubmit={onSubmit}>
                {({ submit, Bind }) => (
                    <>
                        <Grid>
                            <Cell span={12}>
                                <Typography use={"overline"}>Folder menu item</Typography>
                            </Cell>
                        </Grid>
                        <Grid>
                            <Cell span={12}>
                                <Bind name="title" validators={validation.create("required")}>
                                    <Input label={`Title`} data-testid="pb.menu.new.folder.title" />
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
                                    data-testid="pb.menu.new.folder.button.save"
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

export default FolderForm;
