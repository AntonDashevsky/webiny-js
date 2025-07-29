import React, { useContext } from "react";
import type { FormOnSubmit, GenericFormData } from "@webiny/form";
import { Form, useForm } from "@webiny/form";
import { Dialog } from "@webiny/admin-ui";

interface DialogProps {
    onSubmit: (data: GenericFormData) => void;
    closeDialog: () => void;
    loading: boolean;
    open: boolean;
    children: JSX.Element;
}

export const CustomDialog = ({ open, loading, closeDialog, onSubmit, children }: DialogProps) => {
    const handleSubmit: FormOnSubmit = data => {
        onSubmit(data);
    };

    return (
        <Dialog open={open} onClose={closeDialog}>
            {open ? (
                <Form onSubmit={handleSubmit}>
                    {() => (
                        <CustomDialogProvider loading={loading} closeDialog={closeDialog}>
                            {children}
                        </CustomDialogProvider>
                    )}
                </Form>
            ) : null}
        </Dialog>
    );
};

export interface CustomDialogContext {
    loading: boolean;
    closeDialog: () => void;
    submit: () => void;
}

const CustomDialogContext = React.createContext<CustomDialogContext | undefined>(undefined);

interface CustomDialogProviderProps {
    loading: boolean;
    closeDialog: () => void;
    children: JSX.Element;
}

const CustomDialogProvider = ({ loading, closeDialog, children }: CustomDialogProviderProps) => {
    const form = useForm();

    const context: CustomDialogContext = { submit: form.submit, loading, closeDialog };

    return <CustomDialogContext.Provider value={context}>{children}</CustomDialogContext.Provider>;
};

export const useCustomDialog = () => {
    const context = useContext(CustomDialogContext);

    if (!context) {
        throw new Error("useCustomDialog must be used within the CustomDialogProvider.");
    }

    return context;
};
