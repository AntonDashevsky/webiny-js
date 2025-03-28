import React, { ReactNode } from "react";

import { Form, FormOnSubmit, GenericFormData } from "@webiny/form";
import { ButtonDefault, ButtonPrimary } from "@webiny/ui/Button/index.js";
import { DialogActions, DialogContent, DialogTitle } from "@webiny/ui/Dialog/index.js";
import { CircularProgress } from "@webiny/ui/Progress/index.js";

import { DialogContainer } from "./styled.js";

interface DialogProps {
    title: ReactNode;
    content: ReactNode;
    acceptLabel?: ReactNode;
    cancelLabel?: ReactNode;
    loadingLabel?: ReactNode;
    onSubmit: (data: GenericFormData) => void;
    closeDialog: () => void;
    loading: boolean;
    open: boolean;
    formData?: GenericFormData;
}

export const Dialog = ({
    open,
    loading,
    title,
    content,
    acceptLabel,
    cancelLabel,
    loadingLabel = "Loading...",
    closeDialog,
    onSubmit,
    formData
}: DialogProps) => {
    const handleSubmit: FormOnSubmit = data => {
        onSubmit(data);
    };

    return (
        <DialogContainer open={open} onClose={closeDialog}>
            {open ? (
                <Form onSubmit={handleSubmit} data={formData}>
                    {({ submit }) => (
                        <>
                            {loading && <CircularProgress label={loadingLabel} />}
                            <DialogTitle>{title}</DialogTitle>
                            <DialogContent>{content}</DialogContent>
                            <DialogActions>
                                {cancelLabel ? (
                                    <ButtonDefault onClick={closeDialog}>
                                        {cancelLabel}
                                    </ButtonDefault>
                                ) : null}
                                {acceptLabel ? (
                                    <ButtonPrimary onClick={submit}>{acceptLabel}</ButtonPrimary>
                                ) : null}
                            </DialogActions>
                        </>
                    )}
                </Form>
            ) : null}
        </DialogContainer>
    );
};
