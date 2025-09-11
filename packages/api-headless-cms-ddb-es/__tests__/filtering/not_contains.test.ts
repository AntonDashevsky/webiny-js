import type { CmsEntryListWhere } from "@webiny/api-headless-cms/types/index.js";
import type { CreateExecFilteringResponse } from "~/operations/entry/elasticsearch/filtering/index.js";
import type { ElasticsearchBoolQueryConfig } from "@webiny/api-elasticsearch/types.js";
import type { Query } from "./mocks/index.js";
import { createQuery, createPluginsContainer } from "./mocks/index.js";
import { normalizeValue } from "@webiny/api-elasticsearch";
import { createExecFiltering } from "./mocks/filtering.js";

describe("not_contains filter", () => {
    let query: Query;
    let execFiltering: CreateExecFilteringResponse;

    beforeEach(() => {
        query = createQuery();
        execFiltering = createExecFiltering({
            plugins: createPluginsContainer()
        });
    });

    it("should add not_contains filter", async () => {
        const title = "Webiny";
        const where: CmsEntryListWhere = {
            title_not_contains: title
        };

        execFiltering({
            query,
            where
        });

        const expected: ElasticsearchBoolQueryConfig = {
            should: [],
            must: [],
            filter: [],
            must_not: [
                {
                    query_string: {
                        allow_leading_wildcard: true,
                        fields: ["values.title"],
                        query: `*${normalizeValue(title)}*`,
                        default_operator: "and"
                    }
                }
            ]
        };

        expect(query).toEqual(expected);
    });
});
