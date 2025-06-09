import { ElasticsearchQueryBuilderOperatorPlugin } from "~/plugins/definition/ElasticsearchQueryBuilderOperatorPlugin.js";
import { normalizeValueWithAsterisk } from "~/normalize.js";
import { type ElasticsearchBoolQueryConfig, type ElasticsearchQueryBuilderArgsPlugin } from "~/types.js";

export class ElasticsearchQueryBuilderJapaneseOperatorContainsPlugin extends ElasticsearchQueryBuilderOperatorPlugin {
    public override name = "elasticsearch.queryBuilder.operator.contains.japanese";

    public override isLocaleSupported(code: string): boolean {
        if (!code) {
            return false;
        }
        return ["ja", "ja-jp"].includes(code.toLowerCase());
    }

    public getOperator(): string {
        return "contains";
    }

    public apply(
        query: ElasticsearchBoolQueryConfig,
        params: ElasticsearchQueryBuilderArgsPlugin
    ): void {
        const { value: initialValue, basePath } = params;

        const value = normalizeValueWithAsterisk(initialValue);
        query.must.push({
            multi_match: {
                query: value,
                type: "phrase",
                fields: [`${basePath}.ngram`]
            }
        });
        query.should.push({
            multi_match: {
                query: value,
                type: "phrase",
                fields: [`${basePath}`]
            }
        });
    }
}
