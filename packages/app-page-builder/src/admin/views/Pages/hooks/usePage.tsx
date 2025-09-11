import type { SearchRecordItem } from "@webiny/app-aco/table.types";
import type { PbPageDataItem } from "~/types";
import { createUsePageHook } from "~/admin/contexts/Page";

export const usePage = createUsePageHook<SearchRecordItem<PbPageDataItem>>();
