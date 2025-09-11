import type { DbContext } from "@webiny/handler-db/types.js";
import type { IWebsocketsContextObject } from "./context/abstractions/IWebsocketsContext.js";
import type { SecurityContext, SecurityPermission } from "@webiny/api-security/types.js";
import type { I18NContext } from "@webiny/api-i18n/types.js";

export type { IWebsocketsContextObject };

export interface Context extends DbContext, SecurityContext, I18NContext {
    websockets: IWebsocketsContextObject;
}

export interface WebsocketsPermission extends SecurityPermission {
    name: "websockets";
    rwd?: string;
}
