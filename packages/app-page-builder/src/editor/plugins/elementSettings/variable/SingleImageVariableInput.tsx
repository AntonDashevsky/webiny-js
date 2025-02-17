import React from "react";
import { useVariable } from "~/hooks/useVariable.js";
import SingleImageUpload from "@webiny/app-admin/components/SingleImageUpload.js";

interface SingleImageVariableInputProps {
    variableId: string;
}

const SingleImageVariableInput = ({ variableId }: SingleImageVariableInputProps) => {
    const { value, onChange } = useVariable(variableId);

    return <SingleImageUpload onChange={value => onChange(value, true)} value={value} />;
};

export default SingleImageVariableInput;
