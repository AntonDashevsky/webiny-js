import React from "react";

import { type FbFormModelField, type FbFormStep } from "~/types.js";
import { RowHandle, StyledAccordion, StyledAccordionItem, Wrapper } from "../Styled.js";

import { Icon } from "@webiny/ui/Icon/index.js";
import { AccordionItem } from "@webiny/ui/Accordion/index.js";
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete_outline.svg";
import { ReactComponent as EditIcon } from "@material-design-icons/svg/outlined/edit.svg";
import { ReactComponent as HandleIcon } from "~/admin/components/FormEditor/icons/round-drag_indicator-24px.svg";
import { EmptyFormStep } from "./EmptyFormStep.js";
import { FormStepWithFields } from "./FormStepWithFields.js";

import EditFieldDialog from "../EditFieldDialog.js";
import { useFormStep } from "./useFormStep.js";

export interface FormStepProps {
    title: string;
    deleteStepDisabled: boolean;
    formStep: FbFormStep;
    onDelete: () => void;
    onEdit: () => void;
    getStepFields: (stepId: string) => FbFormModelField[][];
    updateField: (field: FbFormModelField) => void;
    deleteField: (field: FbFormModelField, stepId: string) => void;
}

export const FormStep = (props: FormStepProps) => {
    const { title, deleteStepDisabled, formStep, onDelete, onEdit, getStepFields, updateField } =
        props;

    const { dropDestination, editingField, editField, createCustomField } = useFormStep();

    const fields = getStepFields(formStep.id);

    return (
        <Wrapper data-testid="form-step-element">
            <StyledAccordion>
                <RowHandle>
                    <Icon icon={<HandleIcon />} />
                </RowHandle>
                <StyledAccordionItem
                    title={title}
                    open={true}
                    actions={
                        <AccordionItem.Actions>
                            <AccordionItem.Action icon={<EditIcon />} onClick={onEdit} />
                            <AccordionItem.Action
                                icon={<DeleteIcon />}
                                onClick={onDelete}
                                disabled={deleteStepDisabled}
                            />
                        </AccordionItem.Actions>
                    }
                >
                    {fields.length === 0 ? (
                        <EmptyFormStep formStep={formStep} />
                    ) : (
                        <FormStepWithFields formStep={formStep} fields={fields} />
                    )}
                    <EditFieldDialog
                        field={editingField}
                        onClose={() => {
                            editField(null);
                        }}
                        onSubmit={initialData => {
                            const data = initialData as FbFormModelField;

                            if (data._id) {
                                updateField(data);
                            } else if (dropDestination) {
                                createCustomField({
                                    data,
                                    dropDestination
                                });
                            }

                            editField(null);
                        }}
                    />
                </StyledAccordionItem>
            </StyledAccordion>
        </Wrapper>
    );
};
