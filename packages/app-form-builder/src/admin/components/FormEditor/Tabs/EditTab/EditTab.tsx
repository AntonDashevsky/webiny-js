import React, { useState } from "react";
import { EditContainer } from "./Styled.js";
import { useFormEditor } from "~/admin/components/FormEditor/index.js";
import { type FbFormStep } from "~/types.js";

import { EditFormStepDialog } from "./FormStep/EditFormStepDialog.js";

import { FieldErrors } from "./FieldErrors.js";
import { EditTabStep } from "./EditTabStep.js";

export const EditTab = () => {
    const { data, errors, updateStep } = useFormEditor();

    const [isEditStep, setIsEditStep] = useState<{ isOpened: boolean; id: string | null }>({
        isOpened: false,
        id: null
    });

    const stepTitle = data.steps.find(step => step.id === isEditStep.id)?.title || "";

    return (
        <EditContainer>
            <FieldErrors errors={errors} />
            {(data.steps || []).map((formStep: FbFormStep, index: number) => (
                <EditTabStep
                    key={`edit-tab-step${index}`}
                    formStep={formStep}
                    index={index}
                    setIsEditStep={setIsEditStep}
                />
            ))}
            <EditFormStepDialog
                isEditStep={isEditStep}
                setIsEditStep={setIsEditStep}
                updateStep={updateStep}
                stepTitle={stepTitle}
            />
        </EditContainer>
    );
};
