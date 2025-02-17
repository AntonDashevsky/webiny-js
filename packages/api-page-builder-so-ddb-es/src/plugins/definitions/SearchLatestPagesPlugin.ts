import { SearchPagesPlugin } from "./SearchPagesPlugin.js";

export class SearchLatestPagesPlugin extends SearchPagesPlugin {
    public static override readonly type: string = "pb.elasticsearch.search-latest-pages";
}
