import React from "react";
import { useRouter } from "@webiny/app-admin";
import { ReactComponent as Icon } from "@webiny/icons/manage_search.svg";
import { AdminConfig, AdminLayout, useWcp } from "@webiny/app-admin";
import { HasPermission } from "@webiny/app-security";
import { LogsModule } from "~/views/Logs/LogsModule.js";
import { AuditLogsPermissions } from "~/plugins/permissionRenderer/index.js";
import { LogsView } from "~/views/Logs/LogsView.js";
import { AuditLogsListWithConfig } from "~/config/list/index.js";
import { Routes } from "~/routes.js";

const { Menu, Route } = AdminConfig;

export const AuditLogs = () => {
    const wcp = useWcp();
    const router = useRouter();

    if (!wcp.canUseAuditLogs()) {
        return null;
    }

    return (
        <>
            <LogsModule />
            <AdminConfig>
                <HasPermission any={["al.*"]}>
                    <Menu
                        name="auditLogs"
                        element={
                            <Menu.Link
                                text={"Audit Logs"}
                                icon={<Menu.Link.Icon element={<Icon />} label={"Audit Logs"} />}
                                to={router.getLink(Routes.AuditLogsList)}
                            />
                        }
                    />
                    <Route
                        route={Routes.AuditLogsList}
                        element={
                            <AdminLayout title={"Audit Logs - Logs"}>
                                <AuditLogsListWithConfig>
                                    <LogsView />
                                </AuditLogsListWithConfig>
                            </AdminLayout>
                        }
                    />
                </HasPermission>
            </AdminConfig>
            <AuditLogsPermissions />
        </>
    );
};
