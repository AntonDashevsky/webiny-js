import React, { useCallback } from "react";
import slugify from "slugify";
import { css } from "emotion";
import pick from "lodash/pick.js";
import { Form, FormAPI } from "@webiny/form";
import { plugins } from "@webiny/plugins";
import { ButtonPrimary } from "@webiny/ui/Button/index.js";
import { Grid, Cell } from "@webiny/ui/Grid/index.js";
import { Select } from "@webiny/ui/Select/index.js";
import { SimpleFormContent } from "@webiny/app-admin/components/SimpleForm/index.js";
import { validation } from "@webiny/validation";
import { Dialog, DialogCancel, DialogTitle, DialogActions, DialogContent } from "@webiny/ui/Dialog/index.js";

import { useTemplate } from "~/templateEditor/hooks/useTemplate.js";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler.js";
import { UpdateDocumentActionEvent } from "~/editor/recoil/actions/index.js";
import { Input } from "@webiny/ui/Input/index.js";
import { PbPageLayoutPlugin, PbPageTemplate } from "~/types.js";
import { Tags } from "@webiny/ui/Tags/index.js";

const narrowDialog = css`
    & .mdc-dialog__surface {
        width: 600px;
        min-width: 600px;
    }
`;

interface TemplateSettingsModalProps {
    open: boolean;
    onClose: () => void;
}

const TemplateSettingsModal = (props: TemplateSettingsModalProps) => {
    const handler = useEventActionHandler();
    const [template] = useTemplate();

    const layouts = React.useMemo(() => {
        const layoutPlugins = plugins.byType<PbPageLayoutPlugin>("pb-page-layout");
        return (layoutPlugins || []).map(pl => pl.layout);
    }, []);

    const updateTemplate = (data: Partial<PbPageTemplate>) => {
        handler.trigger(
            new UpdateDocumentActionEvent({
                history: false,
                document: data
            })
        );
    };

    const generateSlug = (form: FormAPI) => () => {
        if (form.data.slug) {
            return;
        }

        // We want to update slug only when the group is first being created.
        form.setValue(
            "slug",
            slugify(form.data.title, {
                replacement: "-",
                lower: true,
                remove: /[*#\?<>_\{\}\[\]+~.()'"!:;@]/g,
                trim: false
            })
        );
    };

    const onSubmit = useCallback((formData: Partial<PbPageTemplate>) => {
        updateTemplate(formData);
        props.onClose();
    }, []);

    const settings = pick(template, ["title", "description", "slug", "layout", "tags"]);

    return (
        <Dialog open={props.open} onClose={props.onClose} className={narrowDialog}>
            <Form data={settings} onSubmit={onSubmit}>
                {({ form, Bind }) => (
                    <>
                        <DialogTitle>Template Settings</DialogTitle>
                        <DialogContent>
                            <SimpleFormContent>
                                <Grid>
                                    <Cell span={6}>
                                        <Bind
                                            name="title"
                                            validators={[validation.create("required")]}
                                        >
                                            <Input label="Title" onBlur={generateSlug(form)} />
                                        </Bind>
                                    </Cell>
                                    <Cell span={6}>
                                        <Bind
                                            name="slug"
                                            validators={[validation.create("required")]}
                                        >
                                            <Input
                                                label="Slug"
                                                description={
                                                    "Slug should not be changed if there are already existing pages that are using this template."
                                                }
                                            />
                                        </Bind>
                                    </Cell>
                                    <Cell span={12}>
                                        <Bind name="description">
                                            <Input label="Description" />
                                        </Bind>
                                    </Cell>
                                    <Cell span={12}>
                                        <Bind
                                            name="layout"
                                            defaultValue={layouts.length ? layouts[0].name : ""}
                                        >
                                            <Select label="Layout">
                                                {layouts.map(({ name, title }) => (
                                                    <option key={name} value={name}>
                                                        {title}
                                                    </option>
                                                ))}
                                            </Select>
                                        </Bind>
                                    </Cell>
                                    <Cell span={12}>
                                        <Bind name="tags">
                                            <Tags label="Tags" />
                                        </Bind>
                                    </Cell>
                                </Grid>
                            </SimpleFormContent>
                        </DialogContent>
                        <DialogActions>
                            <DialogCancel onClick={props.onClose}>Cancel</DialogCancel>
                            <ButtonPrimary
                                onClick={ev => {
                                    form.submit(ev);
                                }}
                            >
                                Save
                            </ButtonPrimary>
                        </DialogActions>
                    </>
                )}
            </Form>
        </Dialog>
    );
};

export default TemplateSettingsModal;
