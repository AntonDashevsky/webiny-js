import type { Page } from "./Page.js";
import { ListCache } from "~/shared/cache/ListCache.js";

export const fullPageCache = new ListCache<Page>("id");
export const pageListCache = new ListCache<Page>("entryId");
