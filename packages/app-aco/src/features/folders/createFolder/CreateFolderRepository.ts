import type { ICreateFolderRepository } from "./ICreateFolderRepository.js";
import type { ListCache } from "../cache/index.js";
import { Folder } from "../Folder.js";
import type { ICreateFolderGateway } from "./ICreateFolderGateway.js";
import type { FolderDto } from "./FolderDto.js";

export class CreateFolderRepository implements ICreateFolderRepository {
    private cache: ListCache<Folder>;
    private gateway: ICreateFolderGateway;
    private readonly type: string;

    constructor(cache: ListCache<Folder>, gateway: ICreateFolderGateway, type: string) {
        this.cache = cache;
        this.gateway = gateway;
        this.type = type;
    }

    async execute(folder: Folder) {
        const dto: FolderDto = {
            title: folder.title,
            slug: folder.slug,
            permissions: folder.permissions,
            type: this.type,
            parentId: folder.parentId,
            extensions: folder.extensions
        };

        const result = await this.gateway.execute(dto);
        this.cache.addItems([Folder.create(result)]);
    }
}
