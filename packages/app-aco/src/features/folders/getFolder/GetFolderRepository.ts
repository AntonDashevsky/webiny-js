import { Folder } from "../Folder";
import type { ListCache } from "../cache";
import type { IGetFolderRepository } from "./IGetFolderRepository";
import type { IGetFolderGateway } from "./IGetFolderGateway";

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
