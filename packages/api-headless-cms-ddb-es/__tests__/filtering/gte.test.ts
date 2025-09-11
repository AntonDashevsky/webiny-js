import type { CmsEntryListWhere } from "@webiny/api-headless-cms/types";
import type { ElasticsearchBoolQueryConfig } from "@webiny/api-elasticsearch/types";
import type { Query } from "./mocks";
import { createQuery, createPluginsContainer } from "./mocks";
import type { CreateExecFilteringResponse } from "~/operations/entry/elasticsearch/filtering";
import { createExecFiltering } from "./mocks/filtering";

describe("greater than or equal filter", () => {
    let query: Query;
    let execFiltering: CreateExecFilteringResponse;

    beforeEach(() => {
        query = createQuery();
        execFiltering = createExecFiltering({
            plugins: createPluginsContainer()
        });
    });

    it("should add greater than or equal filter", async () => {
        const where: CmsEntryListWhere = {
            age_gte: 10
        };

        execFiltering({
            query,
            where
        });

        const expected: ElasticsearchBoolQueryConfig = {
            must: [],
            should: [],
            filter: [
                {
                    range: {
                        "values.age": {
                            gte: 10
                        }
                    }
                }
            ],
            must_not: []
        };

        expect(query).toEqual(expected);
    });
});
