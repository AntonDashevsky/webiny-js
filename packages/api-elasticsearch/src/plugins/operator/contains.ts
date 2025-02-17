import { ElasticsearchQueryBuilderOperatorPlugin } from "~/plugins/definition/ElasticsearchQueryBuilderOperatorPlugin.js";
import { normalizeValueWithAsterisk } from "~/normalize.js";
import { ElasticsearchBoolQueryConfig, ElasticsearchQueryBuilderArgsPlugin } from "~/types.js";

export class ElasticsearchQueryBuilderOperatorContainsPlugin extends ElasticsearchQueryBuilderOperatorPlugin {
    public override name = "elasticsearch.queryBuilder.operator.contains.default";

    public getOperator(): string {
        return "contains";
    }

    public apply(
        query: ElasticsearchBoolQueryConfig,
        params: ElasticsearchQueryBuilderArgsPlugin
    ): void {
        const { value, basePath } = params;
        query.must.push({
            query_string: {
                allow_leading_wildcard: true,
                fields: [basePath],
                query: normalizeValueWithAsterisk(value),
                default_operator: "and"
            }
        });
    }
}
