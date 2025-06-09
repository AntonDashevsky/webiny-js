import { useCallback } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { DeleteFolderGqlGateway } from "./DeleteFolderGqlGateway.js";
import { type DeleteFolderParams } from "./IDeleteFolderUseCase.js";
import { DeleteFolder } from "./DeleteFolder.js";
import { useFoldersType } from "~/hooks/index.js";

export const useDeleteFolder = () => {
    const client = useApolloClient();
    const type = useFoldersType();
    const gateway = new DeleteFolderGqlGateway(client);

    const deleteFolder = useCallback(
        (params: DeleteFolderParams) => {
            const instance = DeleteFolder.getInstance(type, gateway);
            return instance.execute(params);
        },
        [type, gateway]
    );

    return {
        deleteFolder
    };
};
