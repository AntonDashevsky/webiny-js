import { SearchPagesPlugin } from "./SearchPagesPlugin.js";

export class SearchPublishedPagesPlugin extends SearchPagesPlugin {
    public static override readonly type: string = "pb.elasticsearch.search-published-pages";
}
