import { useCallback } from "react";
import { useFoldersType } from "~/hooks/index.js";
import { useFolderModel } from "~/features/index.js";
import { GetFolderExtensionsFields } from "./GetFolderExtensionsFields.js";

export const useGetFolderExtensionsFields = () => {
    const [type, modelId] = useFoldersType().split(":");
    const model = useFolderModel();

    const getFolderExtensionsFields = useCallback(() => {
        const instance = GetFolderExtensionsFields.getInstance(model, type, modelId);
        return instance.execute();
    }, [type, modelId, model.id]);

    return {
        getFolderExtensionsFields
    };
};
