import React from "react";
import { EditorConfig } from "~/editor/index.js";
import { useActiveElement } from "~/editor/index.js";
import { Input } from "@webiny/ui/Input/index.js";
import { type PbEditorElement } from "~/types.js";
import { useInputBinding } from "./useInputBinding.js";
import { DelayedOnChange } from "@webiny/ui/DelayedOnChange/index.js";

const { Ui } = EditorConfig;

export interface OnElementTypeProps {
    elementType: string;
    children: React.ReactNode;
}

const OnElementType = ({ elementType, children }: OnElementTypeProps) => {
    const [element] = useActiveElement();

    if (element?.type === elementType) {
        return <>{children}</>;
    }

    return null;
};

export interface ElementInputProps {
    elementType: string;
    inputName: string;
    label: string;
}

export const ElementBinding = ({ elementType, inputName, label }: ElementInputProps) => {
    return (
        <Ui.Sidebar.Element
            name={`elementInput:${elementType}:${inputName}`}
            group={"dataSettings"}
            element={
                <OnElementType elementType={elementType}>
                    <ElementInputUi inputName={inputName} label={label} />
                </OnElementType>
            }
        />
    );
};

interface ElementInputUiProps {
    inputName: string;
    label: string;
}

const ElementInputUi = ({ inputName, label }: ElementInputUiProps) => {
    const [element] = useActiveElement<PbEditorElement>();
    const { binding, onChange } = useInputBinding(element, inputName);
    const value = binding ? binding.getSource() : "";

    return (
        <>
            <DelayedOnChange value={value} onChange={onChange}>
                {({ value, onChange }) => <Input label={label} value={value} onChange={onChange} />}
            </DelayedOnChange>
        </>
    );
};
