import { describe, it, expect, beforeEach, vi } from "vitest";
import { CreateFolder } from "./CreateFolder.js";
import { folderCacheFactory } from "../cache/FoldersCacheFactory.js";
import type { FolderGqlDto } from "~/features/folders/listFolders/FolderGqlDto.js";
import type { ICreateFolderGateway } from "~/features/folders/createFolder/ICreateFolderGateway.js";

class CreateFolderMockGateway implements ICreateFolderGateway {
    async execute() {
        return {
            id: "any-folder-id",
            title: "New Folder",
            slug: "new-folder",
            type: "abc"
        } as FolderGqlDto; // We don't care about the rest of the props, hence the type assertion.
    }
}

describe("CreateFolder", () => {
    const type = "abc";
    const gateway = new CreateFolderMockGateway();

    const foldersCache = folderCacheFactory.getCache(type);

    beforeEach(() => {
        foldersCache.clear();
    });

    it("should be able to create a new folder", async () => {
        const spy = vi.spyOn(gateway, "execute");
        const createFolder = CreateFolder.getInstance(type, gateway);

        expect(foldersCache.hasItems()).toBeFalse();

        await createFolder.execute({
            title: "New Folder",
            slug: "new-folder",
            parentId: null,
            permissions: [],
            type
        });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(foldersCache.hasItems()).toBeTrue();

        const item = foldersCache.getItem(folder => folder.slug === "new-folder");

        expect(item).toBeDefined();
        expect(item?.id).toEqual("any-folder-id");
        expect(item?.type).toEqual(type);
        expect(item?.title).toEqual("New Folder");
        expect(item?.slug).toEqual("new-folder");
    });
});
