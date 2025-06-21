import { DeleteFolder } from "./DeleteFolder.js";
import { folderCacheFactory } from "../cache/FoldersCacheFactory.js";
import { Folder } from "../Folder.js";
import { IDeleteFolderGateway } from "~/features/folders/deleteFolder/IDeleteFolderGateway";

class DeleteFolderMockGateway implements IDeleteFolderGateway {
    async execute() {}
}

describe("DeleteFolder", () => {
    const type = "abc";
    const gateway = new DeleteFolderMockGateway();

    const foldersCache = folderCacheFactory.getCache(type);

    beforeEach(() => {
        foldersCache.clear();
        foldersCache.addItems([
            Folder.create({
                id: "any-folder-id",
                title: "New Folder",
                slug: "new-folder",
                parentId: null,
                permissions: [],
                type
            })
        ]);
    });

    it("should be able to delete a folder", async () => {
        const deleteFolder = DeleteFolder.getInstance(type, gateway);

        expect(foldersCache.hasItems()).toBeTrue();
        const item = foldersCache.getItem(folder => folder.id === "any-folder-id");
        expect(item?.id).toEqual("any-folder-id");

        await deleteFolder.execute({
            id: "any-folder-id",
            title: "New Folder",
            slug: "new-folder",
            parentId: null,
            permissions: [],
            type
        });

        expect(gateway.execute).toHaveBeenCalledTimes(1);
        expect(foldersCache.hasItems()).toBeFalse();
    });
});
