import { Folder } from "../Folder.js";
import { ListCache } from "../cache/index.js";
import { IGetFolderRepository } from "./IGetFolderRepository.js";
import { IGetFolderGateway } from "./IGetFolderGateway.js";

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
