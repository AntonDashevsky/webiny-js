import type { ModifyQueryParams as BaseModifyQueryParams } from "@webiny/api-elasticsearch";
import { ElasticsearchQueryModifierPlugin } from "@webiny/api-elasticsearch";
import type { SortType } from "@webiny/api-elasticsearch/types";

export interface ModifyQueryParams extends BaseModifyQueryParams {
    limit: number;
    sort: SortType;
}

export class PageElasticsearchQueryModifierPlugin extends ElasticsearchQueryModifierPlugin<ModifyQueryParams> {
    public static override readonly type: string = "pageBuilder.elasticsearch.modifier.query.page";
}
