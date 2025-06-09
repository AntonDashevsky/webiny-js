import {
    type FormBuilderStorageOperations as BaseFormBuilderStorageOperations,
    type FormBuilderSystemStorageOperations as BaseFormBuilderSystemStorageOperations,
    type FormBuilderSubmissionStorageOperations as BaseFormBuilderSubmissionStorageOperations,
    type FormBuilderSettingsStorageOperations as BaseFormBuilderSettingsStorageOperations,
    type FormBuilderFormStorageOperations as BaseFormBuilderFormStorageOperations
} from "@webiny/api-form-builder/types.js";
import { type DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { type Entity, type Table } from "@webiny/db-dynamodb/toolbox.js";
import { type AttributeDefinition } from "@webiny/db-dynamodb/toolbox.js";
import { type Plugin } from "@webiny/plugins";

export type Attributes = Record<string, AttributeDefinition>;

export enum ENTITIES {
    FORM = "FormBuilderForm",
    SUBMISSION = "FormBuilderSubmission",
    SYSTEM = "FormBuilderSystem",
    SETTINGS = "FormBuilderSettings"
}

export interface FormBuilderStorageOperationsFactoryParams {
    documentClient: DynamoDBDocument;
    table?: string;
    attributes?: Record<ENTITIES, Attributes>;
    plugins?: Plugin;
}

export interface FormBuilderSystemCreateKeysParams {
    tenant: string;
}

export interface FormBuilderSystemStorageOperations extends BaseFormBuilderSystemStorageOperations {
    createSystemPartitionKey: (params: FormBuilderSystemCreateKeysParams) => string;
    createSystemSortKey: () => string;
}

export interface FormBuilderFormCreatePartitionKeyParams {
    tenant: string;
    locale: string;
}

export interface FormBuilderFormCreateGSIPartitionKeyParams {
    id?: string;
    formId?: string;
    tenant: string;
    locale: string;
}

export interface FormBuilderFormStorageOperations extends BaseFormBuilderFormStorageOperations {
    createFormPartitionKey: (params: FormBuilderFormCreatePartitionKeyParams) => string;
}

export interface FormBuilderSubmissionStorageOperationsCreatePartitionKeyParams {
    tenant: string;
    locale: string;
    formId: string;
}

export interface FormBuilderSubmissionStorageOperations
    extends BaseFormBuilderSubmissionStorageOperations {
    createSubmissionPartitionKey: (
        params: FormBuilderSubmissionStorageOperationsCreatePartitionKeyParams
    ) => string;
    createSubmissionSortKey: (id: string) => string;
}

export interface FormBuilderSettingsStorageOperationsCreatePartitionKeyParams {
    tenant: string;
    locale: string;
}

export interface FormBuilderSettingsStorageOperations
    extends BaseFormBuilderSettingsStorageOperations {
    createSettingsPartitionKey: (
        params: FormBuilderSettingsStorageOperationsCreatePartitionKeyParams
    ) => string;
    createSettingsSortKey: () => string;
}

export type Entities = "form" | "submission" | "system" | "settings";

export interface FormBuilderStorageOperations
    extends BaseFormBuilderStorageOperations,
        FormBuilderSettingsStorageOperations,
        FormBuilderSubmissionStorageOperations,
        FormBuilderFormStorageOperations,
        FormBuilderSystemStorageOperations {
    getTable(): Table<string, string, string>;
    getEntities(): Record<Entities, Entity<any>>;
}

export interface FormBuilderStorageOperationsFactory {
    (params: FormBuilderStorageOperationsFactoryParams): FormBuilderStorageOperations;
}
