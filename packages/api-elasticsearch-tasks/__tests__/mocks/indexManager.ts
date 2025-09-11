import { IndexManager } from "~/settings";
import type { Client } from "@webiny/api-elasticsearch";
import type { IElasticsearchIndexingTaskValuesSettings } from "~/types";
import { createElasticsearchClientMock } from "~tests/mocks/elasticsearch";

interface Params {
    client?: Client;
    settings?: IElasticsearchIndexingTaskValuesSettings;
}

export const createIndexManagerMock = (params?: Params) => {
    return new IndexManager(
        params?.client || createElasticsearchClientMock(),
        params?.settings || {}
    );
};
