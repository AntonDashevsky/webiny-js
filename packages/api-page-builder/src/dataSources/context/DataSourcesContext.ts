import { type IDataLoader, type IDataSource, type IDataSourceContext } from "~/dataSources/types.js";
import { DataLoader } from "~/dataSources/DataLoader.js";

export class DataSourcesContext implements IDataSourceContext {
    private dataSources: IDataSource[] = [];

    addDataSource(dataSource: IDataSource): void {
        this.dataSources.push(dataSource);
    }

    getLoader(): IDataLoader {
        return new DataLoader(this.dataSources);
    }
}
