import React from "react";
import { AccordionItem } from "@webiny/ui/Accordion/index.js";
import { PermissionRendererPlugin } from "@webiny/app-admin/plugins/PermissionRendererPlugin.js";
import { i18n } from "@webiny/app/i18n/index.js";
import { ReactComponent as TranslateIcon } from "../../assets/icons/round-translate-24px.svg";
import { I18NPermissions } from "./I18NPermissions.js";

const t = i18n.ns("app-i18n/admin/plugins/permissionRenderer");

export default new PermissionRendererPlugin({
    render(props) {
        return (
            <AccordionItem
                icon={<TranslateIcon />}
                title={t`I18N`}
                description={t`Manage I18N app access permissions.`}
                data-testid={"permission.i18n"}
            >
                <I18NPermissions {...props} />
            </AccordionItem>
        );
    }
});
