import React from "react";
import { AccordionItem } from "@webiny/ui/Accordion/index.js";
import { type AdminAppPermissionRendererPlugin } from "@webiny/app-admin/types.js";
import { ReactComponent as Icon } from "../assets/lock.svg";
import { RecordLockingPermissions } from "./RecordLockingPermissions.js";

export const recordLockingPermissionRenderer: AdminAppPermissionRendererPlugin = {
    type: "admin-app-permissions-renderer",
    name: "admin-app-permissions-renderer-record-locking",
    render(props) {
        return (
            <AccordionItem
                icon={<Icon />}
                title={"Record Locking"}
                description={"Manage Record Locking Permissions."}
                data-testid={"permission.recordLocking"}
            >
                <RecordLockingPermissions {...props} />
            </AccordionItem>
        );
    }
};
