import { useCallback, useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { useApolloClient } from "@apollo/react-hooks";
import { ListFoldersByParentIdsGqlGateway } from "./ListFoldersByParentIdsGqlGateway.js";
import { ListFoldersByParentIds } from "./ListFoldersByParentIds.js";
import { FolderDtoMapper } from "./FolderDto.js";
import { useFoldersType, useGetFolderGraphQLSelection } from "~/hooks/index.js";
import { type FolderItem } from "~/types.js";
import { ROOT_FOLDER } from "~/constants.js";

export const useListFoldersByParentIds = () => {
    const client = useApolloClient();
    const type = useFoldersType();
    const fields = useGetFolderGraphQLSelection();
    const gateway = new ListFoldersByParentIdsGqlGateway(client, fields);

    const [vm, setVm] = useState<{
        folders: FolderItem[];
    }>({
        folders: []
    });

    const {
        useCase,
        folders: foldersCache,
        loading: loadingState
    } = useMemo(() => {
        return ListFoldersByParentIds.getInstance(type, gateway);
    }, [type, gateway]);

    const listFoldersByParentIds = useCallback(
        (parentIds?: string[]) => {
            return useCase.execute({ parentIds });
        },
        [useCase]
    );

    const getIsFolderLoading = useCallback(
        (action = ROOT_FOLDER) => {
            if (!loadingState) {
                return true;
            }

            return loadingState.isLoading(action);
        },
        [loadingState]
    );

    useEffect(() => {
        return autorun(() => {
            const folders = foldersCache.getItems().map(folder => FolderDtoMapper.toDTO(folder));

            setVm(vm => ({
                ...vm,
                folders
            }));
        });
    }, [foldersCache]);

    return {
        ...vm,
        listFoldersByParentIds,
        getIsFolderLoading
    };
};
