import type { WbRedirect } from "~/context/redirects/redirects.types.js";
import type { ActiveRedirectDto } from "./ActiveRedirectDto.js";

export class ActiveRedirectRestMapper {
    static toDto(redirect: WbRedirect): ActiveRedirectDto {
        return {
            id: redirect.id,
            from: redirect.redirectFrom,
            to: redirect.redirectTo,
            permanent: redirect.redirectType === "permanent"
        };
    }
}
