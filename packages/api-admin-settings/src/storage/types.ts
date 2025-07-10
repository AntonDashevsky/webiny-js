import { TableConstructor } from "@webiny/db-dynamodb/toolbox";
import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";

export interface TableModifier {
    (table: TableConstructor<string, string, string>): TableConstructor<string, string, string>;
}

export interface StorageOperationsFactoryParams {
    documentClient: DynamoDBDocument;
    table?: TableModifier;
}

export interface StorageOperationsSettingsService {
    getSettings: (variant: any) => Promise<any | null>;
}
export interface StorageOperationsService {
    settings: StorageOperationsSettingsService;
}

export interface StorageOperationsFactory {
    (params: StorageOperationsFactoryParams): Promise<StorageOperationsService>;
}
