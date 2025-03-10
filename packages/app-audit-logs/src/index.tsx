import React, { useCallback } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { ReactComponent as Icon } from "@material-symbols/svg-400/outlined/quick_reference_all.svg";

import { AddRoute, Layout, Plugin, useWcp } from "@webiny/app-admin";
import { HasPermission } from "@webiny/app-security";
import { AcoProvider } from "@webiny/app-aco";

import { AuditLogsListWithConfig } from "~/config/list";
import { LogsModule } from "~/views/Logs/LogsModule";
import { AuditLogsPermissions } from "~/plugins/permissionRenderer";
import AuditLogsView from "~/views/Logs/Logs";
import { LOCAL_STORAGE_LATEST_VISITED_FOLDER } from "~/constants";
import { AdminConfig } from "@webiny/app-admin";

const { Menu } = AdminConfig;

export const AuditLogs = () => {
    const client = useApolloClient();

    const createNavigateFolderStorageKey = useCallback(() => {
        return LOCAL_STORAGE_LATEST_VISITED_FOLDER;
    }, []);

    const { canUseFeature } = useWcp();
    if (!canUseFeature("auditLogs")) {
        return null;
    }

    return (
        <>
            <LogsModule />
            <Plugin>
                <HasPermission any={["al.*"]}>
                    <Menu
                        name="auditLogs"
                        element={
                            <Menu.Item label={"Audit Logs"} icon={<Icon />} path="/audit-logs" />
                        }
                    />
                    <AddRoute exact path={"/audit-logs"}>
                        <Layout title={"Audit Logs - Logs"}>
                            <AuditLogsListWithConfig>
                                <AcoProvider
                                    id="AuditLogs"
                                    client={client}
                                    createNavigateFolderStorageKey={createNavigateFolderStorageKey}
                                >
                                    <AuditLogsView />
                                </AcoProvider>
                            </AuditLogsListWithConfig>
                        </Layout>
                    </AddRoute>
                </HasPermission>
            </Plugin>
            <AuditLogsPermissions />
        </>
    );
};
