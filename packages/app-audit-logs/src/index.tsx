import React, { useCallback } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { ReactComponent as Icon } from "@material-symbols/svg-400/outlined/quick_reference_all.svg";

import { AddMenu, AddRoute, Layout, Plugin, useWcp } from "@webiny/app-admin";
import { HasPermission } from "@webiny/app-security";
import { AcoProvider } from "@webiny/app-aco";

import { AuditLogsListWithConfig } from "~/config/list/index.js";
import { LogsModule } from "~/views/Logs/LogsModule.js";
import { AuditLogsPermissions } from "~/plugins/permissionRenderer/index.js";
import AuditLogsView from "~/views/Logs/Logs.js";
import { LOCAL_STORAGE_LATEST_VISITED_FOLDER } from "~/constants/index.js";

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
                    <AddMenu name="auditLogs" label={`Audit Logs`} icon={<Icon />}>
                        <AddMenu name={"auditLogs.logs"} label={`Logs`} path="/audit-logs" />
                    </AddMenu>
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
