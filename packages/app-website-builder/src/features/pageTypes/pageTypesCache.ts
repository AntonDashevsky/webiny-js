import { ListCache } from "~/shared/cache";
import type { PageType } from "./PageType";

export const pageTypesCache = new ListCache<PageType>("name");
