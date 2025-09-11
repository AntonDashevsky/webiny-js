import { useCallback } from "react";
import { useFoldersType } from "~/hooks/index.js";
import { GetFolderAncestors } from "~/features/folders/getFolderAncestors/GetFolderAncestors.js";

export const useGetFolderAncestors = () => {
    const type = useFoldersType();

    const getFolderAncestors = useCallback(
        (id: string) => {
            const instance = GetFolderAncestors.getInstance(type);
            return instance.execute({ id });
        },
        [type]
    );

    return {
        getFolderAncestors
    };
};
