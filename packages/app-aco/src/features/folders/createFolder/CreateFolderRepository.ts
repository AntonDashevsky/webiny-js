import type { ICreateFolderRepository } from "./ICreateFolderRepository";
import type { ListCache } from "../cache";
import { Folder } from "../Folder";
import type { ICreateFolderGateway } from "./ICreateFolderGateway";
import type { FolderDto } from "./FolderDto";

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
