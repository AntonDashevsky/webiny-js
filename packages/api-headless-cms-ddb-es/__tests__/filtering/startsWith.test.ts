import type { CmsEntryListWhere } from "@webiny/api-headless-cms/types/index.js";
import type { ElasticsearchBoolQueryConfig } from "@webiny/api-elasticsearch/types.js";
import type { Query } from "./mocks/index.js";
import { createQuery, createPluginsContainer } from "./mocks/index.js";
import type { CreateExecFilteringResponse } from "./mocks/filtering.js";
import { createExecFiltering } from "./mocks/filtering.js";

describe("startsWith filter", () => {
    let query: Query;
    let execFiltering: CreateExecFilteringResponse;

    beforeEach(() => {
        query = createQuery();
        execFiltering = createExecFiltering({
            plugins: createPluginsContainer()
        });
    });

    it("should add startsWith filter", async () => {
        const title = "webiny";
        const where: CmsEntryListWhere = {
            title_startsWith: title
        };

        execFiltering({
            query,
            where
        });

        const expected: ElasticsearchBoolQueryConfig = {
            should: [],
            must: [],
            filter: [
                {
                    match_phrase_prefix: {
                        ["values.title"]: title
                    }
                }
            ],
            must_not: []
        };

        expect(query).toEqual(expected);
    });
});
