import { IDeleteFolderRepository } from "./IDeleteFolderRepository.js";
import { ListCache } from "../cache/index.js";
import { Folder } from "../Folder.js";
import { IDeleteFolderGateway } from "./IDeleteFolderGateway.js";

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
