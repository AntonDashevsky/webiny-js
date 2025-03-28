import { useCallback } from "react";
import { GetDescendantFolders } from "./GetDescendantFolders.js";
import { useFoldersType } from "~/hooks/index.js";

export const useGetDescendantFolders = () => {
    const type = useFoldersType();

    const getDescendantFolders = useCallback(
        (id: string) => {
            const instance = GetDescendantFolders.getInstance(type);
            return instance.execute({ id });
        },
        [type]
    );

    return {
        getDescendantFolders
    };
};
