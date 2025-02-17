import { ListCache } from "../ListCache.js";
import { PbPageTemplateWithContent } from "~/types.js";

export const pageTemplateCache = new ListCache<PbPageTemplateWithContent>();
