import React from "react";
import { ScheduleActionDialogProvider } from "./useScheduleActionDialog.js";
import { ScheduleActionDialog } from "./ScheduleActionDialog.js";
import { ChangeContentStatusDialog } from "./ChangeContentStatusDialog.js";
import { ChangeContentStatusButton } from "./ChangeContentStatusButton.js";

export const ChangeContentStatus = () => {
    return (
        <ScheduleActionDialogProvider>
            <ScheduleActionDialog />
            <ChangeContentStatusDialog />
            <ChangeContentStatusButton />
        </ScheduleActionDialogProvider>
    );
};
