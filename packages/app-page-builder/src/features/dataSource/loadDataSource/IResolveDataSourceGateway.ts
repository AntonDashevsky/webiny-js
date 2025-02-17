import { DataRequest, DataSourceData } from "./IResolveDataSourceRepository.js";

export interface IResolveDataSourceGateway {
    execute(request: DataRequest): Promise<DataSourceData>;
}
