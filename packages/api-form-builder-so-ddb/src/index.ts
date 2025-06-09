import dynamoDbValueFilters from "@webiny/db-dynamodb/plugins/filters/index.js";
import formSubmissionFields from "~/operations/submission/fields.js";
import formFields from "~/operations/form/fields.js";
import WebinyError from "@webiny/error";
import { type FormBuilderStorageOperationsFactory, ENTITIES } from "~/types.js";
import { createTable } from "~/definitions/table.js";
import { createFormEntity } from "~/definitions/form.js";
import { createSubmissionEntity } from "~/definitions/submission.js";
import { createSystemEntity } from "~/definitions/system.js";
import { createSettingsEntity } from "~/definitions/settings.js";
import { createSystemStorageOperations } from "~/operations/system/index.js";
import { createSubmissionStorageOperations } from "~/operations/submission/index.js";
import { createSettingsStorageOperations } from "~/operations/settings/index.js";
import { createFormStorageOperations } from "~/operations/form/index.js";
import { PluginsContainer } from "@webiny/plugins";
import { FormDynamoDbFieldPlugin, FormSubmissionDynamoDbFieldPlugin } from "~/plugins/index.js";
import { CompressorPlugin } from "@webiny/api";

const reservedFields = ["PK", "SK", "index", "data", "TYPE", "__type", "GSI1_PK", "GSI1_SK"];

const isReserved = (name: string): void => {
    if (reservedFields.includes(name) === false) {
        return;
    }
    throw new WebinyError(`Attribute name "${name}" is not allowed.`, "ATTRIBUTE_NOT_ALLOWED", {
        name
    });
};

export * from "./plugins/index.js";

export const createFormBuilderStorageOperations: FormBuilderStorageOperationsFactory = params => {
    const { attributes, table: tableName, documentClient, plugins: userPlugins } = params;

    if (attributes) {
        Object.values(attributes).forEach(attrs => {
            Object.keys(attrs).forEach(isReserved);
        });
    }

    const plugins = new PluginsContainer([
        /**
         * User defined plugins.
         */
        userPlugins || [],
        /**
         * Form submission DynamoDB fields.
         */
        formSubmissionFields(),
        /**
         * Form DynamoDB fields.
         */
        formFields(),

        /**
         * DynamoDB filter plugins for the where conditions.
         */
        dynamoDbValueFilters()
    ]);

    const table = createTable({
        tableName,
        documentClient
    });

    const entities = {
        /**
         * Regular entities.
         */
        form: createFormEntity({
            entityName: ENTITIES.FORM,
            table,
            attributes: attributes ? attributes[ENTITIES.FORM] : {}
        }),
        submission: createSubmissionEntity({
            entityName: ENTITIES.SUBMISSION,
            table,
            attributes: attributes ? attributes[ENTITIES.SUBMISSION] : {}
        }),
        system: createSystemEntity({
            entityName: ENTITIES.SYSTEM,
            table,
            attributes: attributes ? attributes[ENTITIES.SYSTEM] : {}
        }),
        settings: createSettingsEntity({
            entityName: ENTITIES.SETTINGS,
            table,
            attributes: attributes ? attributes[ENTITIES.SETTINGS] : {}
        })
    };

    return {
        beforeInit: async context => {
            const types: string[] = [
                FormDynamoDbFieldPlugin.type,
                FormSubmissionDynamoDbFieldPlugin.type,
                CompressorPlugin.type
            ];
            for (const type of types) {
                plugins.mergeByType(context.plugins, type);
            }
        },
        getTable: () => table,
        getEntities: () => entities,
        ...createSystemStorageOperations({
            table,
            entity: entities.system
        }),
        ...createSettingsStorageOperations({
            table,
            entity: entities.settings
        }),
        ...createFormStorageOperations({
            table,
            entity: entities.form,
            plugins
        }),
        ...createSubmissionStorageOperations({
            table,
            entity: entities.submission,
            plugins
        })
    };
};
