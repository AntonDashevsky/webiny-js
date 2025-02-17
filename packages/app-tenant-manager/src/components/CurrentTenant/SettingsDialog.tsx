import React from "react";
import { css } from "emotion";
import { Form } from "@webiny/form";
import { Dialog, DialogActions, DialogCancel, DialogContent, DialogTitle } from "@webiny/ui/Dialog/index.js";
import { useTenant } from "./useTenant.js";
import { CircularProgress } from "@webiny/ui/Progress/index.js";
import { Domains } from "../Domains.js";
import { ButtonPrimary } from "@webiny/ui/Button/index.js";

interface Props {
    open: boolean;
    onClose: () => void;
}

const narrowDialog = css({
    ".mdc-dialog__surface": {
        width: 600,
        minWidth: 600
    }
});

export const SettingsDialog = ({ open, onClose }: Props) => {
    const { tenant, loading, saving, update } = useTenant({ onSaved: onClose });

    return (
        <Dialog open={open} onClose={onClose} className={narrowDialog}>
            <Form onSubmit={update} data={tenant}>
                {({ submit }) => (
                    <React.Fragment>
                        {loading && <CircularProgress label={"Loading Settings..."} />}
                        {saving && <CircularProgress label={"Saving Settings..."} />}
                        <DialogTitle>Tenant Settings</DialogTitle>
                        <DialogContent>
                            <Domains />
                        </DialogContent>
                        <DialogActions>
                            <DialogCancel>Cancel</DialogCancel>
                            <ButtonPrimary onClick={submit}>Save</ButtonPrimary>
                        </DialogActions>
                    </React.Fragment>
                )}
            </Form>
        </Dialog>
    );
};
