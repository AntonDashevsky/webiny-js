import { useCallback, useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { useApolloClient } from "@apollo/react-hooks";
import { ListFoldersCompressedGqlGateway } from "./ListFoldersCompressedGqlGateway.js";
import { ListFolders } from "./ListFolders.js";
import { FolderDtoMapper } from "./FolderDto.js";
import { useFoldersType } from "~/hooks/index.js";
import { FolderItem } from "~/types.js";

export const useListFolders = () => {
    const client = useApolloClient();
    const type = useFoldersType();
    const gateway = new ListFoldersCompressedGqlGateway(client);

    const [vm, setVm] = useState<{
        folders: FolderItem[];
        loading: Record<string, boolean>;
    }>({
        folders: [],
        loading: {
            INIT: true
        }
    });

    const {
        useCase,
        folders: foldersCache,
        loading
    } = useMemo(() => {
        return ListFolders.getInstance(type, gateway);
    }, [type, gateway]);

    const listFolders = useCallback(() => {
        return useCase.execute();
    }, [useCase]);

    useEffect(() => {
        if (foldersCache.hasItems()) {
            return; // Skip if we already have folders in the cache.
        }

        listFolders();
    }, []);

    useEffect(() => {
        return autorun(() => {
            const folders = foldersCache.getItems().map(folder => FolderDtoMapper.toDTO(folder));

            setVm(vm => ({
                ...vm,
                folders
            }));
        });
    }, [foldersCache]);

    useEffect(() => {
        return autorun(() => {
            const loadingState = loading.get();

            setVm(vm => ({
                ...vm,
                loading: loadingState
            }));
        });
    }, [loading]);

    return {
        ...vm,
        listFolders
    };
};
