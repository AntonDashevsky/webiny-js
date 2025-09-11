import type { IGetDescendantFoldersRepository } from "./IGetDescendantFoldersRepository.js";
import type { ListCache } from "../cache/index.js";
import type { Folder } from "../Folder.js";
import { ROOT_FOLDER } from "~/constants.js";

export class GetDescendantFoldersRepository implements IGetDescendantFoldersRepository {
    private readonly cache: ListCache<Folder>;

    constructor(cache: ListCache<Folder>) {
        this.cache = cache;
    }

    execute(id: string): Folder[] {
        const currentFolders = this.cache.getItems();

        if (!id || id === ROOT_FOLDER || !currentFolders.length) {
            return [];
        }

        const folderMap = new Map(currentFolders.map(folder => [folder.id, folder]));
        const result: Folder[] = [];

        const findChildren = (folderId: string) => {
            const folder = folderMap.get(folderId);
            if (!folder) {
                return;
            }

            result.push(folder);

            currentFolders.forEach(child => {
                if (child.parentId === folder.id) {
                    findChildren(child.id);
                }
            });
        };

        findChildren(id);

        return result;
    }
}
