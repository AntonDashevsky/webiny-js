export interface LoadPagesUseCaseParams {
    folderId: string;
    resetSearch?: boolean;
}

export interface ILoadPagesUseCase {
    execute: (params: LoadPagesUseCaseParams) => Promise<void>;
}
