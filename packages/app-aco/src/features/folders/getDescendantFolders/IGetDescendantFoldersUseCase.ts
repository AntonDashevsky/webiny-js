import { type FolderDto } from "./FolderDto.js";

export interface GetDescendantFoldersParams {
    id: string;
}

export interface IGetDescendantFoldersUseCase {
    execute: (params: GetDescendantFoldersParams) => FolderDto[];
}
