import React from "react";
import { type FbFormModelField, type FbFormStep } from "~/types.js";
import { FormStepRow } from "./FormStepWithFields/FormStepRow.js";

export interface FormStepWithFieldsProps {
    fields: FbFormModelField[][];
    formStep: FbFormStep;
}

export const FormStepWithFields = ({ fields, formStep }: FormStepWithFieldsProps) => {
    return (
        <React.Fragment>
            {(fields || []).map((row, rowIndex) => (
                <FormStepRow
                    key={`row-${rowIndex}`}
                    row={row}
                    rowIndex={rowIndex}
                    formStep={formStep}
                    isLastRow={rowIndex === fields.length - 1}
                />
            ))}
        </React.Fragment>
    );
};
