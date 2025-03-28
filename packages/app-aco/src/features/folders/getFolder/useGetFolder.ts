import { useCallback } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { GetFolderGqlGateway } from "./GetFolderGqlGateway.js";
import { GetFolderParams } from "./IGetFolderUseCase.js";
import { GetFolder } from "./GetFolder.js";
import { useFoldersType, useGetFolderGraphQLSelection } from "~/hooks/index.js";

export const useGetFolder = () => {
    const client = useApolloClient();
    const type = useFoldersType();
    const fields = useGetFolderGraphQLSelection();
    const gateway = new GetFolderGqlGateway(client, fields);

    const getFolder = useCallback(
        (params: GetFolderParams) => {
            const instance = GetFolder.getInstance(type, gateway);
            return instance.execute(params);
        },
        [type, gateway]
    );

    return {
        getFolder
    };
};
