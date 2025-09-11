import { createBlankQuery } from "../../helpers.js";
import type { ElasticsearchBoolQueryConfig } from "~/types.js";
import { ElasticsearchQueryBuilderOperatorEqualPlugin } from "~/plugins/operator/index.js";

describe("ElasticsearchQueryBuilderOperatorEqualPlugin", () => {
    const plugin = new ElasticsearchQueryBuilderOperatorEqualPlugin();

    it("should apply equal correctly", () => {
        const query = createBlankQuery();

        plugin.apply(query, {
            name: "name",
            basePath: "name",
            path: "name.keyword",
            value: "John",
            keyword: true
        });

        plugin.apply(query, {
            name: "name",
            basePath: "name",
            path: "name.keyword",
            value: "Doe",
            keyword: true
        });

        const expected: ElasticsearchBoolQueryConfig = {
            must_not: [],
            must: [],
            filter: [
                {
                    term: {
                        "name.keyword": "John"
                    }
                },
                {
                    term: {
                        "name.keyword": "Doe"
                    }
                }
            ],
            should: []
        };

        expect(query).toEqual(expected);
    });
});
