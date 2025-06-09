import { Filter, type FilterConfig } from "./Filter.js";
import { FiltersToWhere, type FiltersToWhereConverter } from "./FiltersToWhere.js";

export interface BrowserConfig {
    filters: FilterConfig[];
    filtersToWhere: FiltersToWhereConverter[];
}

export const Browser = {
    Filter,
    FiltersToWhere
};
