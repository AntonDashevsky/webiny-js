import React, { useCallback } from "react";
import { Input } from "@webiny/ui/Input/index.js";
import { Grid, Cell } from "@webiny/ui/Grid/index.js";
import camelCase from "lodash/camelCase.js";
import { useFormEditor } from "../../../Context/index.js";
import { validation } from "@webiny/validation";
import { type Validator } from "@webiny/validation/types.js";
import { type FbFormModelField } from "~/types.js";
import { type FormRenderPropParams } from "@webiny/form/types.js";

interface GeneralTabProps {
    field: FbFormModelField;
    form: FormRenderPropParams;
}

const GeneralTab = ({ field, form }: GeneralTabProps) => {
    const { Bind, setValue } = form;
    const { getField, getFieldPlugin } = useFormEditor();

    const afterChangeLabel = useCallback((value: string): void => {
        setValue("fieldId", camelCase(value));
    }, []);

    const uniqueFieldIdValidator: Validator = useCallback((fieldId: string) => {
        const existingField = getField({ fieldId });
        if (!existingField) {
            return true;
        }

        if (existingField._id === field._id) {
            return true;
        }
        throw new Error("Please enter a unique Field ID");
    }, []);

    const fieldIdValidator: Validator = useCallback((fieldId: string) => {
        if (!fieldId) {
            return true;
        }

        if (/^[a-zA-Z0-9_-]*$/.test(fieldId)) {
            return true;
        }
        throw Error('Field ID may contain only letters, numbers and "-" and "_" characters.');
    }, []);

    const fieldPlugin = getFieldPlugin({ name: field.name });

    let additionalSettings: React.ReactNode = null;
    if (fieldPlugin && typeof fieldPlugin.field.renderSettings === "function") {
        additionalSettings = fieldPlugin.field.renderSettings({
            form,
            afterChangeLabel,
            uniqueFieldIdValidator
        });
    }

    return (
        <>
            <Grid>
                <Cell span={6}>
                    <Bind
                        name={"label"}
                        validators={validation.create("required")}
                        afterChange={afterChangeLabel}
                    >
                        <Input label={"Label"} autoFocus={true} />
                    </Bind>
                </Cell>
                <Cell span={6}>
                    <Bind
                        name={"fieldId"}
                        validators={[
                            validation.create("required"),
                            uniqueFieldIdValidator,
                            fieldIdValidator
                        ]}
                    >
                        <Input label={"Field ID"} />
                    </Bind>
                </Cell>
                <Cell span={12}>
                    <Bind name={"helpText"}>
                        <Input label={"Help text"} description={"Help text (optional)"} />
                    </Bind>
                </Cell>
            </Grid>
            {additionalSettings}
        </>
    );
};

export default GeneralTab;
