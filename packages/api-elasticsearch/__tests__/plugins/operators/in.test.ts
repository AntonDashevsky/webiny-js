import { createBlankQuery } from "../../helpers.js";
import type { ElasticsearchBoolQueryConfig } from "~/types.js";
import { ElasticsearchQueryBuilderOperatorInPlugin } from "~/plugins/operator/index.js";

describe("ElasticsearchQueryBuilderOperatorInPlugin", () => {
    const plugin = new ElasticsearchQueryBuilderOperatorInPlugin();

    it(`should apply in operator`, () => {
        const query = createBlankQuery();

        plugin.apply(query, {
            name: "id",
            path: "name.keyword",
            basePath: "name",
            value: ["John", "Johnny"],
            keyword: true
        });

        const expected: ElasticsearchBoolQueryConfig = {
            must_not: [],
            must: [],
            filter: [
                {
                    terms: {
                        ["name.keyword"]: ["John", "Johnny"]
                    }
                }
            ],
            should: []
        };
        expect(query).toEqual(expected);
    });
});
