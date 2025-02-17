import { DbContext } from "@webiny/handler-db/types.js";
import { IWebsocketsContextObject } from "./context/abstractions/IWebsocketsContext.js";
import { SecurityContext, SecurityPermission } from "@webiny/api-security/types.js";
import { I18NContext } from "@webiny/api-i18n/types.js";

export type { IWebsocketsContextObject };

export interface Context extends DbContext, SecurityContext, I18NContext {
    websockets: IWebsocketsContextObject;
}

export interface WebsocketsPermission extends SecurityPermission {
    name: "websockets";
    rwd?: string;
}
