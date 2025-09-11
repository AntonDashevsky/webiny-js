import useCms from "./useCms";
import type { ApolloClient } from "apollo-client";

const useApolloClient = function (): ApolloClient<any> {
    const { apolloClient } = useCms();

    return apolloClient;
};

export default useApolloClient;
