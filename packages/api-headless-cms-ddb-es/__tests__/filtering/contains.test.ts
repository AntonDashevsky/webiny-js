import type { CmsEntryListWhere } from "@webiny/api-headless-cms/types/index.js";
import type { ElasticsearchBoolQueryConfig } from "@webiny/api-elasticsearch/types.js";
import type { Query } from "./mocks/index.js";
import { createQuery, createPluginsContainer } from "./mocks/index.js";
import { normalizeValue } from "@webiny/api-elasticsearch";
import type { CreateExecFilteringResponse } from "./mocks/filtering.js";
import { createExecFiltering } from "./mocks/filtering.js";

describe("contains filter", () => {
    let query: Query;
    let execFiltering: CreateExecFilteringResponse;

    beforeEach(() => {
        query = createQuery();
        execFiltering = createExecFiltering({
            plugins: createPluginsContainer()
        });
    });

    it("should add contains filter", async () => {
        const title = "Webiny";
        const where: CmsEntryListWhere = {
            title_contains: title
        };

        execFiltering({
            query,
            where
        });

        const expected: ElasticsearchBoolQueryConfig = {
            should: [],
            must: [
                {
                    query_string: {
                        allow_leading_wildcard: true,
                        fields: ["values.title"],
                        query: `*${normalizeValue(title)}*`,
                        default_operator: "and"
                    }
                }
            ],
            filter: [],
            must_not: []
        };

        expect(query).toEqual(expected);
    });
});
