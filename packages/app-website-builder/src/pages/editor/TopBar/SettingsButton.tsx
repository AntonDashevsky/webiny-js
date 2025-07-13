import { IconButton } from "@webiny/admin-ui";
import { ReactComponent as SettingsIcon } from "@webiny/icons/settings.svg";
import React, { useState } from "react";
import { SettingsDialog } from "./Settings/SettingsDialog";

export const SettingsButton = () => {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <div className={"wby-flex wby-gap-x-sm"}>
            <SettingsDialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
                onSave={() => setShowDialog(false)}
            />
            <IconButton
                variant="secondary"
                icon={<SettingsIcon />}
                onClick={() => setShowDialog(true)}
            ></IconButton>
        </div>
    );
};
