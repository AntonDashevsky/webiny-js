import { type ListCache, type LoadedCache } from "../cache/index.js";
import { Folder } from "../Folder.js";
import {
    type GetFolderHierarchyRepositoryParams,
    type IGetFolderHierarchyRepository
} from "./IGetFolderHierarchyRepository.js";
import { type IGetFolderHierarchyGateway } from "./IGetFolderHierarchyGateway.js";

export class GetFolderHierarchyRepository implements IGetFolderHierarchyRepository {
    private cache: ListCache<Folder>;
    private loadedCache: LoadedCache;
    private gateway: IGetFolderHierarchyGateway;
    private readonly type: string;

    constructor(
        cache: ListCache<Folder>,
        loadedCache: LoadedCache,
        gateway: IGetFolderHierarchyGateway,
        type: string
    ) {
        this.cache = cache;
        this.loadedCache = loadedCache;
        this.gateway = gateway;
        this.type = type;
    }

    async execute(params: GetFolderHierarchyRepositoryParams) {
        if (this.loadedCache.getItem(item => item === params.id)) {
            return;
        }

        const response = await this.gateway.execute({ type: this.type, id: params.id });

        const { parents = [], siblings = [] } = response;

        if (parents.length > 0) {
            this.loadedCache.addItems(parents.map(parent => parent.id));
        }

        this.cache.addItems([...parents, ...siblings].map(item => Folder.create(item)));
    }
}
