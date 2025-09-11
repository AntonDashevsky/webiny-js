import type { CmsEntryListWhere } from "@webiny/api-headless-cms/types/index.js";
import type { ElasticsearchBoolQueryConfig } from "@webiny/api-elasticsearch/types.js";
import type { Query } from "./mocks/index.js";
import { createQuery, createPluginsContainer } from "./mocks/index.js";
import type { CreateExecFilteringResponse } from "~/operations/entry/elasticsearch/filtering/index.js";
import { createExecFiltering } from "./mocks/filtering.js";

describe("greater than filter", () => {
    let query: Query;
    let execFiltering: CreateExecFilteringResponse;

    beforeEach(() => {
        query = createQuery();
        execFiltering = createExecFiltering({
            plugins: createPluginsContainer()
        });
    });

    it("should add greater than filter", async () => {
        const where: CmsEntryListWhere = {
            age_gt: 10
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
                            gt: 10
                        }
                    }
                }
            ],
            must_not: []
        };

        expect(query).toEqual(expected);
    });
});
