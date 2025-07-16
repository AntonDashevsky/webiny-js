import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DelayedOnChange, FormComponentLabel } from "@webiny/admin-ui";
import { createLexicalStateTransformer } from "@webiny/lexical-converter";
import { CompositionScope } from "@webiny/app-admin/index";
import { LexicalEditor } from "./LexicalEditor";
import { ElementInputRendererProps } from "~/BaseEditor";
import {
    ExpandedEditorProvider,
    useExpandedEditor
} from "~/inputRenderers/LexicalInput/ExpandedEditor";
import { Dialog } from "@webiny/admin-ui";
import { FloatingLinkEditorPlugin, LexicalEditorConfig } from "@webiny/lexical-editor";
import { LinkEditForm } from "~/inputRenderers/LexicalInput/LinkEditForm.js";
const { Plugin } = LexicalEditorConfig;

type LexicalInputRendererProps = Omit<ElementInputRendererProps, "onChange" | "metadata"> & {
    onChange: (value: string) => void;
};

export const LexicalInputRenderer = (props: ElementInputRendererProps) => {
    const transformer = useMemo(() => {
        return createLexicalStateTransformer();
    }, []);

    const onChange = (lexicalValue: string) => {
        props.onChange(({ value }) => {
            const html = transformer.toHtml(lexicalValue);

            value.set({
                state: lexicalValue,
                html
            });
        });
    };

    return (
        <ExpandedEditorProvider>
            <ExpandableLexicalInputRenderer {...props} onChange={onChange} />
        </ExpandedEditorProvider>
    );
};

interface EditorDialogProps extends Omit<LexicalInputRendererProps, "onPreviewChange" | "label"> {
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
            id={"lexical-editor-dialog"}
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
                <LexicalEditorConfig>
                    <Plugin
                        name={"floatingLinkEditor"}
                        element={
                            <FloatingLinkEditorPlugin
                                anchorElem={() => {
                                    return (
                                        document.getElementById("lexical-editor-dialog") ??
                                        document.body
                                    );
                                }}
                                LinkEditForm={LinkEditForm}
                            />
                        }
                    />
                </LexicalEditorConfig>
            </CompositionScope>
        </Dialog>
    );
};

const ExpandableLexicalInputRenderer = ({
    value,
    onChange,
    input,
    label
}: LexicalInputRendererProps) => {
    const { isExpanded, setExpanded } = useExpandedEditor();

    const applyChanges = useCallback(
        (newValue: any) => {
            onChange(newValue);
            setExpanded(false);
        },
        [onChange, setExpanded]
    );

    return (
        <>
            <FormComponentLabel text={label} />
            <CompositionScope name={"compact"}>
                <DelayedOnChange value={value.state} onChange={onChange}>
                    {({ value, onChange }) => (
                        <LexicalEditor value={value} onChange={onChange} key={input.name} />
                    )}
                </DelayedOnChange>
            </CompositionScope>
            <EditorDialog
                open={isExpanded}
                value={value.state}
                onChange={applyChanges}
                onClose={() => setExpanded(false)}
                input={input}
            />
        </>
    );
};
