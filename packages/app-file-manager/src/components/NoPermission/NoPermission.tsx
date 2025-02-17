import React from "react";
import { i18n } from "@webiny/app/i18n/index.js";
import { Icon } from "@webiny/ui/Icon/index.js";

import {
    NoPermissionBody,
    NoPermissionIcon,
    NoPermissionInner,
    NoPermissionOuter,
    NoPermissionTitle,
    NoPermissionWrapper
} from "./styled.js";

const t = i18n.ns("app-admin/file-manager/components/no-permission");

export const NoPermission = () => {
    return (
        <NoPermissionWrapper>
            <NoPermissionOuter>
                <NoPermissionInner>
                    <Icon icon={<NoPermissionIcon />} />
                    <NoPermissionTitle use={"headline6"}>{t`Permission needed`}</NoPermissionTitle>
                    <NoPermissionBody use={"body2"}>
                        {t`You're missing required permission to access files. Please contact the administrator.`}
                    </NoPermissionBody>
                </NoPermissionInner>
            </NoPermissionOuter>
        </NoPermissionWrapper>
    );
};
