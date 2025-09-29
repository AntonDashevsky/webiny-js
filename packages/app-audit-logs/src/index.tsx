import React from "react";
import { useRouter } from "@webiny/react-router";
import { ReactComponent as Icon } from "@webiny/icons/manage_search.svg";
import { AdminConfig, Layout, useWcp } from "@webiny/app-admin";
import { HasPermission } from "@webiny/app-security";
import { LogsModule } from "~/views/Logs/LogsModule.js";
import { AuditLogsPermissions } from "~/plugins/permissionRenderer/index.js";
import AuditLogsView from "~/views/Logs/Logs.js";
import { Routes } from "~/routes";

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
                            <Layout title={"Audit Logs - Logs"}>
                                <AuditLogsView />
                            </Layout>
                        }
                    />
                </HasPermission>
            </AdminConfig>
            <AuditLogsPermissions />
        </>
    );
};
