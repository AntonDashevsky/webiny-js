import type { WbRedirect } from "~/context/redirects/redirects.types";
import type { ActiveRedirectDto } from "./ActiveRedirectDto";

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
