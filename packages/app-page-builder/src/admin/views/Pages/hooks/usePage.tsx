import { type PbPageTableItem } from "~/types.js";
import { createUsePageHook } from "~/admin/contexts/Page.js";

export const usePage = createUsePageHook<PbPageTableItem>();
