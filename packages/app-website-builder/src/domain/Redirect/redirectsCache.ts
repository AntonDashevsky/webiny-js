import type { Redirect } from "./Redirect.js";
import { ListCache } from "~/shared/cache/ListCache.js";

export const redirectListCache = new ListCache<Redirect>("id");
