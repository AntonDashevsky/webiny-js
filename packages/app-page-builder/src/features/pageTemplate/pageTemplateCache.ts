import { ListCache } from "../ListCache.js";
import { type PbPageTemplateWithContent } from "~/types.js";

export const pageTemplateCache = new ListCache<PbPageTemplateWithContent>();
