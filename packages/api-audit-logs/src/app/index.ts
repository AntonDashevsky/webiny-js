import { ContextPlugin } from "@webiny/api";
import { type AuditLogsAcoContext } from "./types.js";
import { createApp } from "./app.js";

export * from "./createAppModifier.js";

const setupContext = async (context: AuditLogsAcoContext): Promise<void> => {
    const app = await context.aco.registerApp(createApp());

    context.auditLogsAco = {
        app
    };
};

export const createAcoAuditLogsContext = () => {
    const plugin = new ContextPlugin<AuditLogsAcoContext>(async context => {
        if (!context.aco) {
            return;
        }
        await setupContext(context);
    });

    plugin.name = "audit-logs-aco.createContext";

    return plugin;
};
