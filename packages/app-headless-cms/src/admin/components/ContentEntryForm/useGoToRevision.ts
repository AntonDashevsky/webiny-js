import { useRoute, useRouter } from "@webiny/react-router";
import { useCallback } from "react";
import { Routes } from "~/routes.js";

export const useGoToRevision = () => {
    const { goToRoute } = useRouter();
    const route = useRoute(Routes.ContentEntries.List);

    const goToRevision = useCallback(
        (id: string) => {
            goToRoute(Routes.ContentEntries.List, { ...route.params, id });
        },
        [route]
    );

    return { goToRevision };
};
