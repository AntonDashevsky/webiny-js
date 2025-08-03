import { useCallback } from "react";
import { redirectListCache } from "~/domain/Redirect/index.js";

export const useGetRedirect = () => {
    const getRedirect = useCallback(
        async ({ id }: { id: string }) => {
            return redirectListCache.getItem(item => item.id === id);
        },
        [redirectListCache]
    );
    return { getRedirect };
};
