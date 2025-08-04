import { useCallback } from "react";
import { RedirectDtoMapper, redirectListCache } from "~/domain/Redirect/index.js";

export const useGetRedirect = () => {
    const getRedirect = useCallback(
        async ({ id }: { id: string }) => {
            const redirect = redirectListCache.getItem(item => item.id === id);
            if (redirect) {
                return RedirectDtoMapper.toDTO(redirect);
            }
            return undefined;
        },
        [redirectListCache]
    );
    return { getRedirect };
};
