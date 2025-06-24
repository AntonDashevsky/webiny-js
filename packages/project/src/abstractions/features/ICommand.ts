export interface ICommand<TParams = void, TResult = void> {
    execute(params: TParams): Promise<TResult>;
}
