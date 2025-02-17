import type { ICmsEntryFetcher } from "./abstractions/CmsEntryFetcher.js";

export const createCmsEntryFetcher = (fetcher: ICmsEntryFetcher): ICmsEntryFetcher => {
    return fetcher;
};
