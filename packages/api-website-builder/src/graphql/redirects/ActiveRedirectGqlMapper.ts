import type { WbRedirect } from "~/context/redirects/redirects.types";
import type { ActiveRedirectGqlDto } from "./ActiveRedirectGqlDto";

export class ActiveRedirectGqlMapper {
    static toDto(redirect: WbRedirect): ActiveRedirectGqlDto {
        return {
            id: redirect.id,
            from: redirect.redirectFrom,
            to: redirect.redirectTo,
            type: redirect.redirectType
        };
    }
}
