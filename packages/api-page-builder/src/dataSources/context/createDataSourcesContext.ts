import { createContextPlugin } from "@webiny/api";
import type { PbContext } from "~/graphql/types.js";
import { DataSourcesContext } from "./DataSourcesContext.js";
import { CmsEntryDataSource } from "~/dataSources/cmsDataSources/CmsEntryDataSource.js";
import { CmsEntriesDataSource } from "~/dataSources/cmsDataSources/CmsEntriesDataSource.js";

export const createDataSourcesContext = () => {
    return createContextPlugin<PbContext>(context => {
        context.dataSources = new DataSourcesContext();

        context.dataSources.addDataSource(new CmsEntryDataSource(context.cms));
        context.dataSources.addDataSource(new CmsEntriesDataSource(context.cms));
    });
};
