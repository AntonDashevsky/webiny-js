import React from "react";
import { Form } from "@webiny/form";
import { useTenant } from "./useTenant.js";
import { Domains } from "../Domains.js";
import { Dialog, OverlayLoader } from "@webiny/admin-ui";

interface Props {
    open: boolean;
    onClose: () => void;
}

export const SettingsDialog = ({ open, onClose }: Props) => {
    const { tenant, loading, saving, update } = useTenant({ onSaved: onClose });

    return (
        <Form onSubmit={update} data={tenant}>
            {({ submit }) => (
                <Dialog
                    open={open}
                    onClose={onClose}
                    title={"Tenant settings"}
                    actions={
                        <>
                            <Dialog.CancelButton />
                            <Dialog.ConfirmButton text={"Save"} onClick={submit} />
                        </>
                    }
                >
                    <>
                        {loading && <OverlayLoader text={"Loading Settings..."} />}
                        {saving && <OverlayLoader text={"Saving Settings..."} />}
                        <Domains />
                    </>
                </Dialog>
            )}
        </Form>
    );
};
