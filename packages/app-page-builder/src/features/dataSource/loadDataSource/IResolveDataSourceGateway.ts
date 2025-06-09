import { type DataRequest, type DataSourceData } from "./IResolveDataSourceRepository.js";

export interface IResolveDataSourceGateway {
    execute(request: DataRequest): Promise<DataSourceData>;
}
