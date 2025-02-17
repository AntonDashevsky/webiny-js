import React from "react";
import { i18n } from "@webiny/app/i18n/index.js";
import { AccordionItem } from "@webiny/ui/Accordion/index.js";
import { ReactComponent as SecurityIcon } from "@webiny/app-admin/assets/icons/baseline-security-24px.svg";
import { SecurityPermissions } from "./SecurityPermissions.js";
import { PermissionRendererPlugin } from "@webiny/app-admin/plugins/PermissionRendererPlugin.js";

const t = i18n.ns("app-security-admin-users/plugins/permissionRenderer");

export default new PermissionRendererPlugin({
    render(props) {
        return (
            <AccordionItem
                icon={<SecurityIcon />}
                title={t`Security`}
                description={t`Manage Security app access permissions.`}
                data-testid={"permission.security"}
            >
                <SecurityPermissions {...props} />
            </AccordionItem>
        );
    }
});
