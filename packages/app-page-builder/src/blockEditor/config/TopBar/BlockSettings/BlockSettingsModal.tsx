import React, { useCallback } from "react";
import { Form } from "@webiny/form";
import { ButtonPrimary } from "@webiny/ui/Button/index.js";
import { SimpleFormContent } from "@webiny/app-admin/components/SimpleForm/index.js";
import { validation } from "@webiny/validation";
import { Select } from "@webiny/ui/Select/index.js";
import { Dialog, DialogCancel, DialogTitle, DialogActions, DialogContent } from "@webiny/ui/Dialog/index.js";
import { useBlock } from "~/blockEditor/hooks/useBlock.js";
import { useBlockCategories } from "~/blockEditor/hooks/useBlockCategories.js";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler.js";
import { UpdateDocumentActionEvent } from "~/editor/recoil/actions/index.js";
import { type BlockAtomType } from "~/blockEditor/state/index.js";

export interface BlockSettingsModalProps {
    open: boolean;
    onClose: () => void;
}

export const BlockSettingsModal = ({ open, onClose }: BlockSettingsModalProps) => {
    const handler = useEventActionHandler();
    const [block] = useBlock();
    const blockCategories = useBlockCategories();

    const updateBlock = (data: Partial<BlockAtomType>) => {
        handler.trigger(
            new UpdateDocumentActionEvent({
                history: false,
                document: data
            })
        );
    };

    const onSubmit = useCallback((formData: Partial<BlockAtomType>) => {
        updateBlock({ blockCategory: formData.blockCategory });
        onClose();
    }, []);

    return (
        <Dialog open={open} onClose={onClose}>
            <Form data={{ blockCategory: block.blockCategory }} onSubmit={onSubmit}>
                {({ form, Bind }) => (
                    <>
                        <DialogTitle>Block Settings</DialogTitle>
                        <DialogContent>
                            <SimpleFormContent>
                                <Bind
                                    name="blockCategory"
                                    validators={[validation.create("required")]}
                                >
                                    <Select label="Category">
                                        {blockCategories.map((blockCategory, index) => (
                                            <option key={index} value={blockCategory.slug}>
                                                {blockCategory.name}
                                            </option>
                                        ))}
                                    </Select>
                                </Bind>
                            </SimpleFormContent>
                        </DialogContent>
                        <DialogActions>
                            <DialogCancel onClick={onClose}>Cancel</DialogCancel>
                            <ButtonPrimary
                                onClick={ev => {
                                    form.submit(ev);
                                }}
                            >
                                Save
                            </ButtonPrimary>
                        </DialogActions>
                    </>
                )}
            </Form>
        </Dialog>
    );
};
