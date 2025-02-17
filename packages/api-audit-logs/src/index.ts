import { ContextPlugin } from "@webiny/api";
import { createSubscriptionHooks } from "~/subscriptions/index.js";
import { AuditLogsContext } from "~/types.js";
import { createAcoAuditLogsContext } from "~/app/index.js";

export const createAuditLogs = () => {
    const subscriptionsPlugin = new ContextPlugin<AuditLogsContext>(async context => {
        if (!context.wcp.canUseFeature("auditLogs")) {
            return;
        }
        createSubscriptionHooks(context);
    });

    subscriptionsPlugin.name = "auditLogs.context.subscriptions";

    return [subscriptionsPlugin, createAcoAuditLogsContext()];
};

export * from "~/config.js";
export * from "~/app/createAppModifier.js";
