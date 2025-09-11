import { ListCache } from "~/shared/cache/index.js";
import type { PageType } from "./PageType.js";

export const pageTypesCache = new ListCache<PageType>("name");
