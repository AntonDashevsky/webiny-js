import { Folder } from "../Folder.js";
import type { ListCache } from "../cache/index.js";
import type { IGetFolderRepository } from "./IGetFolderRepository.js";
import type { IGetFolderGateway } from "./IGetFolderGateway.js";

export class GetFolderRepository implements IGetFolderRepository {
    private cache: ListCache<Folder>;
    private gateway: IGetFolderGateway;

    constructor(cache: ListCache<Folder>, gateway: IGetFolderGateway) {
        this.cache = cache;
        this.gateway = gateway;
    }

    async execute(id: string) {
        const response = await this.gateway.execute(id);
        this.cache.addItems([Folder.create(response)]);
    }
}
