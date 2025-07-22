import { useCallback } from "react";
import { usePageTypes } from "./usePageTypes";

export const useGetPageType = () => {
    const { pageTypes } = usePageTypes();

    const getPageType = useCallback(
        (pageType: string) => {
            return pageTypes.find(p => p.name === pageType);
        },
        [pageTypes]
    );

    return { getPageType };
};
