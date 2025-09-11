import type { DbContext } from "@webiny/handler-db/types";
import type { IWebsocketsContextObject } from "./context/abstractions/IWebsocketsContext";
import type { SecurityContext, SecurityPermission } from "@webiny/api-security/types";
import type { I18NContext } from "@webiny/api-i18n/types";

export type { IWebsocketsContextObject };

export interface Context extends DbContext, SecurityContext, I18NContext {
    websockets: IWebsocketsContextObject;
}

export interface WebsocketsPermission extends SecurityPermission {
    name: "websockets";
    rwd?: string;
}
