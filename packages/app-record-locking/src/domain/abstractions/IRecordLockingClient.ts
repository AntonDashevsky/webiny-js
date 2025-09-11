import type { ApolloQueryResult, QueryOptions, MutationOptions } from "apollo-client";
import type { FetchResult } from "apollo-link";

export interface IRecordLockingClient {
    query<T, R>(params: QueryOptions<R>): Promise<ApolloQueryResult<T>>;
    mutation<T, R>(options: MutationOptions<T, R>): Promise<FetchResult<T>>;
}
