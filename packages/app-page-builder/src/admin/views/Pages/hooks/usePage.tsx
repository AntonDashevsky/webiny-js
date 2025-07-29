import type { PbPageTableItem } from "~/types";
import { createUsePageHook } from "~/admin/contexts/Page";

export const usePage = createUsePageHook<PbPageTableItem>();
