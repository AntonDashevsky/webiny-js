import { ElasticsearchQueryBuilderOperatorPlugin } from "~/plugins/definition/ElasticsearchQueryBuilderOperatorPlugin.js";
import { ElasticsearchBoolQueryConfig, ElasticsearchQueryBuilderArgsPlugin } from "~/types.js";

export class ElasticsearchQueryBuilderOperatorLesserThanOrEqualToPlugin extends ElasticsearchQueryBuilderOperatorPlugin {
    public override name = "elasticsearch.queryBuilder.operator.lesserThanOrEqualTo.default";

    public getOperator(): string {
        return "lte";
    }

    public apply(
        query: ElasticsearchBoolQueryConfig,
        params: ElasticsearchQueryBuilderArgsPlugin
    ): void {
        const { value, basePath } = params;
        query.filter.push({
            range: {
                [basePath]: {
                    lte: value
                }
            }
        });
    }
}
