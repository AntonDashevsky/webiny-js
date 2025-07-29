import type { Context as SocketsContext } from "~/types";
import type { SecurityContext } from "@webiny/api-security/types";
import type { I18NContext } from "@webiny/api-i18n/types";

export interface Context extends SocketsContext, SecurityContext, I18NContext {}
