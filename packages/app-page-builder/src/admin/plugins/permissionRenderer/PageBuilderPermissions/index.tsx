import React from "react";
import { AccordionItem } from "@webiny/ui/Accordion/index.js";
import { type AdminAppPermissionRendererPlugin } from "@webiny/app-admin/types.js";
import { ReactComponent as Icon } from "../../../assets/table_chart-24px.svg";
import { PageBuilderPermissions } from "./PageBuilderPermissions.js";
import { i18n } from "@webiny/app/i18n/index.js";

const t = i18n.ns("app-page-builder/admin/plugins/permissionRenderer");

const plugin: AdminAppPermissionRendererPlugin = {
    type: "admin-app-permissions-renderer",
    name: "admin-app-permissions-renderer-page-builder",
    render(props) {
        return (
            <AccordionItem
                icon={<Icon />}
                title={t`Page Builder`}
                description={t`Manage Page Builder app access permissions.`}
                data-testid={"permission.pb"}
            >
                <PageBuilderPermissions {...props} />
            </AccordionItem>
        );
    }
};
export default plugin;
