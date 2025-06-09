import { type IDeleteFolderRepository } from "./IDeleteFolderRepository.js";
import { type ListCache } from "../cache/index.js";
import { type Folder } from "../Folder.js";
import { type IDeleteFolderGateway } from "./IDeleteFolderGateway.js";

export class DeleteFolderRepository implements IDeleteFolderRepository {
    private cache: ListCache<Folder>;
    private gateway: IDeleteFolderGateway;

    constructor(cache: ListCache<Folder>, gateway: IDeleteFolderGateway) {
        this.cache = cache;
        this.gateway = gateway;
    }

    async execute(folder: Folder) {
        await this.gateway.execute(folder.id);
        this.cache.removeItems(f => f.id === folder.id);
    }
}
