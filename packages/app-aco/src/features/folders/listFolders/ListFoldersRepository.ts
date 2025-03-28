import { ListCache } from "../cache/index.js";
import { Folder } from "../Folder.js";
import { IListFoldersGateway } from "./IListFoldersGateway.js";
import { IListFoldersRepository } from "./IListFoldersRepository.js";

export class ListFoldersRepository implements IListFoldersRepository {
    private cache: ListCache<Folder>;
    private gateway: IListFoldersGateway;
    private type: string;

    constructor(cache: ListCache<Folder>, gateway: IListFoldersGateway, type: string) {
        this.cache = cache;
        this.gateway = gateway;
        this.type = type;
    }

    async execute() {
        const items = await this.gateway.execute({ type: this.type });
        this.cache.clear();
        this.cache.addItems(items.map(item => Folder.create(item)));
    }
}
