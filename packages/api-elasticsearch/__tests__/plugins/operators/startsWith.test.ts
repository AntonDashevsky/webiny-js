import { createBlankQuery } from "../../helpers.js";
import type { ElasticsearchBoolQueryConfig } from "~/types.js";
import { ElasticsearchQueryBuilderOperatorStartsWithPlugin } from "~/plugins/operator/index.js";

describe("ElasticsearchQueryBuilderOperatorStartsWithPlugin", () => {
    const plugin = new ElasticsearchQueryBuilderOperatorStartsWithPlugin();

    it("should apply startsWith correctly", () => {
        const query = createBlankQuery();

        plugin.apply(query, {
            name: "name",
            path: "name.keyword",
            basePath: "name",
            value: "John",
            keyword: true
        });

        plugin.apply(query, {
            name: "name",
            path: "name.keyword",
            basePath: "name",
            value: "Doe",
            keyword: true
        });

        const expected: ElasticsearchBoolQueryConfig = {
            must_not: [],
            must: [],
            filter: [
                {
                    match_phrase_prefix: {
                        name: "John"
                    }
                },
                {
                    match_phrase_prefix: {
                        name: "Doe"
                    }
                }
            ],
            should: []
        };
        expect(query).toEqual(expected);
    });
});
