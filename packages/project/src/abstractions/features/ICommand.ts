export interface I<TParams = void, TResult = void> {
    execute(params: TParams): Promise<TResult>;
}
