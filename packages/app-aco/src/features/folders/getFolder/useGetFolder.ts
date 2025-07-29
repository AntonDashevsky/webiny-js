import { useCallback } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { GetFolderGqlGateway } from "./GetFolderGqlGateway";
import type { GetFolderParams } from "./IGetFolderUseCase";
import { GetFolder } from "./GetFolder";
import { useFoldersType, useGetFolderGraphQLSelection } from "~/hooks";

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
