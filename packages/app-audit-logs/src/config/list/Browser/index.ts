import { Filter, FilterConfig } from "./Filter.js";
import { FiltersToWhere, FiltersToWhereConverter } from "./FiltersToWhere.js";

export interface BrowserConfig {
    filters: FilterConfig[];
    filtersToWhere: FiltersToWhereConverter[];
}

export const Browser = {
    Filter,
    FiltersToWhere
};
