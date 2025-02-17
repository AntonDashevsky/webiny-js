import { DataSourceData } from "./IResolveDataSourceRepository.js";
import { ListCache } from "~/features/ListCache.js";

export type DataSourceCache = {
    // Data source name.
    key: string;
    // A checksum of data source config. If this changes, new data is requested from the API.
    checksum: string;
    // Resolved data.
    data: DataSourceData;
};

export const dataSourceCache = new ListCache<DataSourceCache>();
