import React, { useCallback, useEffect, useState } from "react";
import { DelayedOnChange } from "@webiny/admin-ui";
import { CompositionScope } from "@webiny/app-admin/index";
import { LexicalEditor } from "./LexicalEditor";
import { ElementInputRendererProps } from "~/BaseEditor";
import {
    ExpandedEditorProvider,
    useExpandedEditor
} from "~/inputRenderers/LexicalInput/ExpandedEditor";

export const LexicalInputRenderer = (props: ElementInputRendererProps) => {
    return (
        <ExpandedEditorProvider>
            <ExpandableLexicalInputRenderer {...props} />
        </ExpandedEditorProvider>
    );
};

import { Dialog } from "@webiny/admin-ui";

interface EditorDialogProps extends Omit<ElementInputRendererProps, "onPreviewChange"> {
    open: boolean;
    onClose: () => void;
}

const EditorDialog = (props: EditorDialogProps) => {
    const [localValue, setLocalValue] = useState(props.value);

    useEffect(() => {
        setLocalValue(props.value);
    }, [props.value]);

    return (
        <Dialog
            open={props.open}
            className={"wby-w-[900px] wby-max-w-[900px] wby-overflow-visible"}
            data-hover-manager={"ignore"}
            title={`Edit ${props.input.label}`}
            dismissible={false}
            showCloseButton={false}
            actions={
                <>
                    <Dialog.CancelButton onClick={props.onClose} />
                    <Dialog.ConfirmButton
                        text={"Save Changes"}
                        onClick={() => {
                            props.onChange(localValue);
                        }}
                    />
                </>
            }
        >
            <CompositionScope name={"expanded"}>
                <DelayedOnChange value={localValue} onChange={setLocalValue}>
                    {({ value, onChange }) => <LexicalEditor value={value} onChange={onChange} />}
                </DelayedOnChange>
            </CompositionScope>
        </Dialog>
    );
};

const ExpandableLexicalInputRenderer = ({ value, onChange, input }: ElementInputRendererProps) => {
    const { isExpanded, setExpanded } = useExpandedEditor();

    const applyChanges = useCallback(
        (value: any) => {
            onChange(value);
            setExpanded(false);
        },
        [onChange, setExpanded]
    );

    return (
        <>
            <CompositionScope name={"compact"}>
                <DelayedOnChange value={value} onChange={onChange}>
                    {({ value, onChange }) => (
                        <LexicalEditor value={value} onChange={onChange} key={input.name} />
                    )}
                </DelayedOnChange>
            </CompositionScope>
            <EditorDialog
                open={isExpanded}
                value={value}
                onChange={applyChanges}
                onClose={() => setExpanded(false)}
                input={input}
            />
        </>
    );
};
