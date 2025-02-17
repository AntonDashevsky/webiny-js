import useCms from "./useCms.js";
import { ApolloClient } from "apollo-client";

const useApolloClient = function (): ApolloClient<any> {
    const { apolloClient } = useCms();

    return apolloClient;
};

export default useApolloClient;
