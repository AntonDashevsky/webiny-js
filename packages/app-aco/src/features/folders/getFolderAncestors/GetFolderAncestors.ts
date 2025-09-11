import { folderCacheFactory } from "../cache/index.js";
import { GetFolderAncestorsRepository } from "./GetFolderAncestorsRepository.js";
import { GetFolderAncestorsUseCase } from "./GetFolderAncestorsUseCase.js";
import type { IGetFolderAncestorsUseCase } from "./IGetFolderAncestorsUseCase.js";

export class GetFolderAncestors {
    public static getInstance(type: string): IGetFolderAncestorsUseCase {
        const foldersCache = folderCacheFactory.getCache(type);
        const repository = new GetFolderAncestorsRepository(foldersCache);
        return new GetFolderAncestorsUseCase(repository);
    }
}
