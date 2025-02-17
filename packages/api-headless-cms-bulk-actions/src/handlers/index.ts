import { createEventBridgeHandler } from "./eventBridgeEventHandler.js";
import { setupEventsTenant } from "./setupEventsTenant.js";

export const createHandlers = () => {
    return [setupEventsTenant(), createEventBridgeHandler()];
};
