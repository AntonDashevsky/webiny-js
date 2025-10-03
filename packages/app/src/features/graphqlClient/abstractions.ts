import { Abstraction } from "@webiny/di-container";
import { DocumentNode } from "graphql";

// eslint-disable-next-line
type GraphQLRequest<TVariables = any, TResult = any> =
    | {
          query: DocumentNode | string;
          mutation?: never;
          variables?: TVariables;
          headers?: Record<string, string>;
      }
    | {
          mutation: DocumentNode | string;
          query?: never;
          variables?: TVariables;
          headers?: Record<string, string>;
      };

export interface IGraphQLClient {
    execute<TVariables = any, TResult = any>(
        params: GraphQLRequest<TVariables, TResult>
    ): Promise<TResult>;
}
export const GraphQLClient = new Abstraction<IGraphQLClient>("GraphQLClient");

export namespace GraphQLClient {
    export type Interface = IGraphQLClient;
    export type Request<TVariables = any, TResult = any> = GraphQLRequest<TVariables, TResult>;
}
