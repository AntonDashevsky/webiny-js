import { IGetDescendantFoldersUseCase } from "./IGetDescendantFoldersUseCase.js";
import { GetDescendantFoldersRepository } from "./GetDescendantFoldersRepository.js";
import { GetDescendantFoldersUseCase } from "./GetDescendantFoldersUseCase.js";
import { folderCacheFactory } from "../cache/index.js";

export class GetDescendantFolders {
    public static getInstance(type: string): IGetDescendantFoldersUseCase {
        const foldersCache = folderCacheFactory.getCache(type);
        const repository = new GetDescendantFoldersRepository(foldersCache);
        return new GetDescendantFoldersUseCase(repository);
    }
}
