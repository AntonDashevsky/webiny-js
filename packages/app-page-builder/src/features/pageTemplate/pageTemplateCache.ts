import { ListCache } from "../ListCache";
import type { PbPageTemplateWithContent } from "~/types";

export const pageTemplateCache = new ListCache<PbPageTemplateWithContent>();
