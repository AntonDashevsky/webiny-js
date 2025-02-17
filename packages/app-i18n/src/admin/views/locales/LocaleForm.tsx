import React from "react";
import styled from "@emotion/styled";
import { i18n } from "@webiny/app/i18n/index.js";
import { Form } from "@webiny/form";
import { Grid, Cell } from "@webiny/ui/Grid/index.js";
import { ButtonDefault, ButtonIcon, ButtonPrimary } from "@webiny/ui/Button/index.js";
import { Switch } from "@webiny/ui/Switch/index.js";
import { CircularProgress } from "@webiny/ui/Progress/index.js";
import {
    SimpleForm,
    SimpleFormFooter,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm/index.js";
import { validation } from "@webiny/validation";
import EmptyView from "@webiny/app-admin/components/EmptyView.js";
import { ReactComponent as AddIcon } from "@webiny/app-admin/assets/icons/add-18px.svg";
import LocaleCodesAutoComplete from "~/admin/components/LocaleCodesAutoComplete.js";
import { useLocaleForm } from "./hooks/useLocaleForm.js";

const t = i18n.ns("app-i18n/admin/locales/form");

const ButtonWrapper = styled("div")({
    display: "flex",
    justifyContent: "space-between"
});

const I18NLocaleForm = () => {
    const { loading, showEmptyView, createLocale, cancelEditing, locale, onSubmit } =
        useLocaleForm();

    // Render "No content" selected view.
    if (showEmptyView) {
        return (
            <EmptyView
                title={t`Click on the left side list to display locale details or create a...`}
                action={
                    <ButtonDefault data-testid="new-record-button" onClick={createLocale}>
                        <ButtonIcon icon={<AddIcon />} /> {t`New Locale`}
                    </ButtonDefault>
                }
            />
        );
    }

    return (
        <Form data-testid={"i18n-locale-form"} data={locale} onSubmit={onSubmit}>
            {({ data, form, Bind }) => (
                <SimpleForm>
                    {loading && <CircularProgress />}
                    <SimpleFormHeader title={data.code || t`New locale`} />
                    <SimpleFormContent>
                        <Grid>
                            <Cell span={12}>
                                <Bind name="code" validators={validation.create("required")}>
                                    <LocaleCodesAutoComplete
                                        disabled={Boolean(data.createdOn)}
                                        label={t`Code`}
                                        data-testid="l18n.locale.code"
                                        description={t`For example: "en-GB"`}
                                    />
                                </Bind>
                            </Cell>
                        </Grid>
                        <Grid>
                            <Cell span={12}>
                                <Bind name="default">
                                    <Switch label={t`Default`} />
                                </Bind>
                            </Cell>
                        </Grid>
                    </SimpleFormContent>
                    <SimpleFormFooter>
                        <ButtonWrapper>
                            <ButtonDefault onClick={cancelEditing}>{t`Cancel`}</ButtonDefault>
                            <ButtonPrimary
                                onClick={ev => {
                                    form.submit(ev);
                                }}
                                data-testid="l18n.locale.save"
                            >{t`Save locale`}</ButtonPrimary>
                        </ButtonWrapper>
                    </SimpleFormFooter>
                </SimpleForm>
            )}
        </Form>
    );
};

export default I18NLocaleForm;
