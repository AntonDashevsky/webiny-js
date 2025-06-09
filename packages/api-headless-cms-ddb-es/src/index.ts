import dynamoDbValueFilters from "@webiny/db-dynamodb/plugins/filters/index.js";
import elasticsearchPlugins from "./elasticsearch/index.js";
import dynamoDbPlugins from "./dynamoDb/index.js";
import { createSystemStorageOperations } from "./operations/system/index.js";
import { createModelsStorageOperations } from "./operations/model/index.js";
import { createEntriesStorageOperations } from "./operations/entry/index.js";
import { ENTITIES, type StorageOperationsFactory } from "~/types.js";
import { createTable } from "~/definitions/table.js";
import { createElasticsearchTable } from "~/definitions/tableElasticsearch.js";
import { createGroupEntity } from "~/definitions/group.js";
import { createModelEntity } from "~/definitions/model.js";
import { createEntryEntity } from "~/definitions/entry.js";
import { createEntryElasticsearchEntity } from "~/definitions/entryElasticsearch.js";
import { createSystemEntity } from "~/definitions/system.js";
import { createElasticsearchIndex } from "~/elasticsearch/createElasticsearchIndex.js";
import { PluginsContainer } from "@webiny/plugins";
import { createGroupsStorageOperations } from "~/operations/group/index.js";
import { ElasticsearchQueryBuilderOperatorPlugin } from "@webiny/api-elasticsearch";
import { elasticsearchIndexPlugins } from "./elasticsearch/indices/index.js";
import { deleteElasticsearchIndex } from "./elasticsearch/deleteElasticsearchIndex.js";
import {
    CmsElasticsearchModelFieldPlugin,
    CmsEntryElasticsearchBodyModifierPlugin,
    CmsEntryElasticsearchFullTextSearchPlugin,
    CmsEntryElasticsearchIndexPlugin,
    CmsEntryElasticsearchQueryBuilderValueSearchPlugin,
    CmsEntryElasticsearchQueryModifierPlugin,
    CmsEntryElasticsearchSortModifierPlugin,
    CmsEntryElasticsearchValuesModifier
} from "~/plugins/index.js";
import { createFilterPlugins } from "~/operations/entry/elasticsearch/filtering/plugins/index.js";
import { CmsEntryFilterPlugin } from "~/plugins/CmsEntryFilterPlugin.js";
import { StorageOperationsCmsModelPlugin, StorageTransformPlugin } from "@webiny/api-headless-cms";
import { createElasticsearchIndexesOnLocaleAfterCreate } from "~/operations/system/indexes.js";
import { createIndexTaskPluginTest } from "~/tasks/createIndexTaskPlugin.js";
import { CompressorPlugin } from "@webiny/api";

export * from "./plugins/index.js";

export const createStorageOperations: StorageOperationsFactory = params => {
    const {
        attributes,
        table,
        esTable,
        documentClient,
        elasticsearch,
        plugins: userPlugins
    } = params;

    const tableInstance = createTable({
        table,
        documentClient
    });
    const tableElasticsearchInstance = createElasticsearchTable({
        table: esTable,
        documentClient
    });

    const entities = {
        system: createSystemEntity({
            entityName: ENTITIES.SYSTEM,
            table: tableInstance,
            attributes: attributes ? attributes[ENTITIES.SYSTEM] : {}
        }),
        groups: createGroupEntity({
            entityName: ENTITIES.GROUPS,
            table: tableInstance,
            attributes: attributes ? attributes[ENTITIES.GROUPS] : {}
        }),
        models: createModelEntity({
            entityName: ENTITIES.MODELS,
            table: tableInstance,
            attributes: attributes ? attributes[ENTITIES.MODELS] : {}
        }),
        entries: createEntryEntity({
            entityName: ENTITIES.ENTRIES,
            table: tableInstance,
            attributes: attributes ? attributes[ENTITIES.ENTRIES] : {}
        }),
        entriesEs: createEntryElasticsearchEntity({
            entityName: ENTITIES.ENTRIES_ES,
            table: tableElasticsearchInstance,
            attributes: attributes ? attributes[ENTITIES.ENTRIES_ES] : {}
        })
    };

    const plugins = new PluginsContainer([
        /**
         * DynamoDB filter plugins for the where conditions.
         */
        dynamoDbValueFilters(),
        /**
         * Field plugins for DynamoDB.
         */
        dynamoDbPlugins(),
        /**
         * Field plugins for Elasticsearch.
         */
        elasticsearchPlugins(),
        /**
         * Built-in Elasticsearch index templates.
         */
        elasticsearchIndexPlugins(),
        /**
         * Filter plugins used to apply filtering from where conditions to Elasticsearch query.
         */
        createFilterPlugins(),
        /**
         * User defined custom plugins.
         * They are at the end because we can then override existing plugins.
         */
        ...(userPlugins || [])
    ]);

    const entries = createEntriesStorageOperations({
        entity: entities.entries,
        esEntity: entities.entriesEs,
        plugins,
        elasticsearch
    });

    return {
        name: "dynamodb:elasticsearch",
        beforeInit: async context => {
            context.db.registry.register({
                item: entities.entries,
                app: "cms",
                tags: ["regular", entities.entries.name]
            });
            context.db.registry.register({
                item: entities.entriesEs,
                app: "cms",
                tags: ["es", entities.entriesEs.name]
            });
            /**
             * Attach the elasticsearch into context if it is not already attached.
             */
            if (!context.elasticsearch) {
                context.elasticsearch = elasticsearch;
            }
            /**
             * Pass the plugins to the parent context.
             */
            context.plugins.register([
                dynamoDbPlugins(),
                createIndexTaskPluginTest(),
                elasticsearchIndexPlugins()
            ]);
            /**
             * We need to fetch all the plugin types in the list from the main container.
             * This way we do not need to register plugins in the storage plugins contains.
             */
            const types: string[] = [
                ElasticsearchQueryBuilderOperatorPlugin.type,
                // Headless CMS
                "cms-model-field-to-graphql",
                CmsEntryFilterPlugin.type,
                CmsEntryElasticsearchBodyModifierPlugin.type,
                CmsEntryElasticsearchFullTextSearchPlugin.type,
                CmsEntryElasticsearchIndexPlugin.type,
                CmsEntryElasticsearchQueryBuilderValueSearchPlugin.type,
                CmsEntryElasticsearchQueryModifierPlugin.type,
                CmsEntryElasticsearchSortModifierPlugin.type,
                CmsElasticsearchModelFieldPlugin.type,
                StorageOperationsCmsModelPlugin.type,
                StorageTransformPlugin.type,
                CmsEntryElasticsearchValuesModifier.type,
                CompressorPlugin.type
            ];
            for (const type of types) {
                plugins.mergeByType(context.plugins, type);
            }
            entries.dataLoaders.clearAll();
        },
        init: async context => {
            /**
             * We need to create indexes on before model create and on clone (create from).
             * Other apps create indexes on locale creation.
             */
            await createElasticsearchIndexesOnLocaleAfterCreate({
                context,
                client: elasticsearch,
                plugins
            });

            context.cms.onModelBeforeCreate.subscribe(async ({ model }) => {
                await createElasticsearchIndex({
                    client: elasticsearch,
                    model,
                    plugins
                });
            });
            context.cms.onModelBeforeCreateFrom.subscribe(async ({ model }) => {
                await createElasticsearchIndex({
                    client: elasticsearch,
                    model,
                    plugins
                });
            });
            context.cms.onModelAfterDelete.subscribe(async ({ model }) => {
                await deleteElasticsearchIndex({
                    client: elasticsearch,
                    model
                });
            });

            context.cms.onModelInitialize.subscribe(async ({ model }) => {
                await createElasticsearchIndex({
                    client: elasticsearch,
                    model,
                    plugins
                });
            });
        },
        getEntities: () => entities,
        getTable: () => tableInstance,
        getEsTable: () => tableElasticsearchInstance,
        system: createSystemStorageOperations({
            entity: entities.system
        }),
        groups: createGroupsStorageOperations({
            entity: entities.groups,
            plugins
        }),
        models: createModelsStorageOperations({
            entity: entities.models,
            elasticsearch
        }),
        entries
    };
};
