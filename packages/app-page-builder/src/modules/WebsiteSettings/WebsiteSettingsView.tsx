import React, { Fragment } from "react";
import { CenteredView } from "@webiny/app-admin";
import { Form } from "@webiny/form";
import { ButtonPrimary } from "@webiny/ui/Button/index.js";
import { CircularProgress } from "@webiny/ui/Progress/index.js";
import {
    SimpleForm,
    SimpleFormContent,
    SimpleFormFooter,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm/index.js";
import { usePbWebsiteSettings } from "./usePbWebsiteSettings.js";
import { WebsiteSettingsConfig } from "~/modules/WebsiteSettings/config/WebsiteSettingsConfig.js";
import { Cell, Grid } from "@webiny/ui/Grid/index.js";

export const WebsiteSettingsView = () => {
    const { fetching, saving, settings, saveSettings } = usePbWebsiteSettings();
    const { groups } = WebsiteSettingsConfig.useWebsiteSettingsConfig();

    return (
        <CenteredView>
            <Form data={settings} onSubmit={saveSettings}>
                {({ submit }) => (
                    <SimpleForm>
                        {fetching && <CircularProgress label={"Loading settings..."} />}
                        {saving && <CircularProgress label={"Saving settings..."} />}
                        {groups.map(group => (
                            <Fragment key={group.name}>
                                <SimpleFormHeader title={group.label} />
                                <SimpleFormContent>
                                    <Grid>
                                        {(group.elements || []).map(el => (
                                            <Cell key={el.name} span={12}>
                                                {el.element}
                                            </Cell>
                                        ))}
                                    </Grid>
                                </SimpleFormContent>
                            </Fragment>
                        ))}
                        <SimpleFormFooter>
                            <ButtonPrimary
                                onClick={ev => {
                                    submit(ev);
                                }}
                            >
                                Save
                            </ButtonPrimary>
                        </SimpleFormFooter>
                    </SimpleForm>
                )}
            </Form>
        </CenteredView>
    );
};
