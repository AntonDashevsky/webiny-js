import { type IUpdateFolderRepository } from "./IUpdateFolderRepository.js";
import { type ListCache } from "../cache/index.js";
import { Folder } from "../Folder.js";
import { type IUpdateFolderGateway } from "./IUpdateFolderGateway.js";
import { type FolderDto } from "./FolderDto.js";

export class UpdateFolderRepository implements IUpdateFolderRepository {
    private cache: ListCache<Folder>;
    private gateway: IUpdateFolderGateway;

    constructor(cache: ListCache<Folder>, gateway: IUpdateFolderGateway) {
        this.cache = cache;
        this.gateway = gateway;
    }

    async execute(folder: Folder) {
        const dto: FolderDto = {
            id: folder.id,
            title: folder.title,
            slug: folder.slug,
            permissions: folder.permissions,
            parentId: folder.parentId,
            extensions: folder.extensions
        };

        const result = await this.gateway.execute(dto);

        this.cache.updateItems(f => {
            if (f.id === folder.id) {
                return Folder.create(result);
            }

            return Folder.create(f);
        });
    }
}
