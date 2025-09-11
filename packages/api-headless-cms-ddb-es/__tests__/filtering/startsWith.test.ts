import type { CmsEntryListWhere } from "@webiny/api-headless-cms/types";
import type { ElasticsearchBoolQueryConfig } from "@webiny/api-elasticsearch/types";
import type { Query } from "./mocks";
import { createQuery, createPluginsContainer } from "./mocks";
import type { CreateExecFilteringResponse } from "./mocks/filtering";
import { createExecFiltering } from "./mocks/filtering";

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
