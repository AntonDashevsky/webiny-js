import { createElasticsearchIndexTaskPlugin } from "@webiny/api-elasticsearch-tasks";
import { configurations } from "~/configurations";
import type { PbContext } from "~/types";

export const createIndexTaskPlugin = () => {
    return createElasticsearchIndexTaskPlugin<PbContext>({
        name: "elasticsearch.pageBuilder.createIndexTaskPlugin",
        getIndexList: async params => {
            const { context, tenant, locale } = params;

            const { index } = configurations.es({
                tenant,
                locale
            });
            return [
                {
                    index,
                    settings: configurations.indexSettings({
                        context,
                        locale
                    })
                }
            ];
        }
    });
};
