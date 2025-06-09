import { type TenancyContext, type Tenant } from "@webiny/api-tenancy/types.js";
import { type Context as BaseContext } from "@webiny/handler/types.js";
import { type I18NContext, type I18NLocale } from "@webiny/api-i18n/types.js";
import { type SecurityContext } from "@webiny/api-security/types.js";
import { type AdminUsersContext } from "@webiny/api-admin-users/types.js";
import { type FileManagerContext } from "@webiny/api-file-manager/types.js";
import { type Context as TasksContext } from "@webiny/tasks/types.js";
import { type CmsContext, type CmsModel, type CmsModelField } from "@webiny/api-headless-cms/types/index.js";
import type {
    AcoSearchRecordCrud,
    AcoSearchRecordCrudBase,
    AcoSearchRecordStorageOperations,
    GenericSearchData,
    SearchRecord
} from "~/record/record.types.js";
import type { AcoFolderCrud, AcoFolderStorageOperations } from "~/folder/folder.types.js";
import type { AcoFilterCrud, AcoFilterStorageOperations } from "~/filter/filter.types.js";
import type {
    AcoFolderLevelPermissionsCrud,
    AcoFolderLevelPermissionsStorageOperations
} from "~/flp/flp.types.js";
import { type FolderLevelPermissions } from "~/flp/index.js";

export * from "./filter/filter.types.js";
export * from "./folder/folder.types.js";
export * from "./record/record.types.js";
export * from "./flp/flp.types.js";

export interface User {
    id: string;
    type: string;
    displayName: string | null;
}

export interface ListMeta {
    cursor: string | null;
    totalCount: number;
    hasMoreItems: boolean;
}

export enum ListSortDirection {
    ASC,
    DESC
}

export type ListSort = Record<string, ListSortDirection>;

export interface AcoBaseFields {
    id: string;
    entryId: string;
    createdOn: string;
    modifiedOn: string | null;
    savedOn: string;
    createdBy: User;
    modifiedBy: User | null;
    savedBy: User;
}

export interface AdvancedContentOrganisation {
    folder: AcoFolderCrud;
    search: AcoSearchRecordCrud;
    filter: AcoFilterCrud;
    flp: AcoFolderLevelPermissionsCrud;
    folderLevelPermissions: FolderLevelPermissions;
    apps: IAcoApps;
    registerApp: (params: IAcoAppRegisterParams) => Promise<IAcoApp>;
    getApp: (name: string) => IAcoApp;
    listApps: () => IAcoApp[];
}

export interface CreateAcoParams {
    getLocale: () => I18NLocale;
    getTenant: () => Tenant;
    storageOperations: AcoStorageOperations;
    folderLevelPermissions: FolderLevelPermissions;
}

export interface AcoStorageOperations {
    folder: AcoFolderStorageOperations;
    search: AcoSearchRecordStorageOperations;
    filter: AcoFilterStorageOperations;
    flp: AcoFolderLevelPermissionsStorageOperations;
}

export interface AcoContext
    extends BaseContext,
        I18NContext,
        TenancyContext,
        SecurityContext,
        AdminUsersContext,
        CmsContext,
        FileManagerContext,
        TasksContext {
    aco: AdvancedContentOrganisation;
}

/**
 * @deprecated Use AcoContext instead
 */
export type ACOContext = AcoContext;

/**
 * Apps
 */
export interface IAcoAppAddFieldCallable {
    (field: CmsModelField): void;
}

export interface IAcoAppRemoveFieldCallable {
    (id: string): void;
}

export interface IAcoAppModifyFieldCallableCallback {
    (field: CmsModelField): CmsModelField;
}

export interface IAcoAppModifyFieldCallable {
    (id: string, cb: IAcoAppModifyFieldCallableCallback): void;
}

export interface IAcoApp {
    context: AcoContext;
    search: AcoSearchRecordCrudBase;
    folder: AcoFolderCrud;
    name: string;
    model: CmsModel;
    getFields: () => CmsModelField[];
    addField: IAcoAppAddFieldCallable;
    removeField: IAcoAppRemoveFieldCallable;
    modifyField: IAcoAppModifyFieldCallable;
}
// TODO: determine correct type
export type IAcoAppOnEntry<T extends GenericSearchData = GenericSearchData> = (
    entry: SearchRecord<T>,
    context: AcoContext
) => Promise<SearchRecord<T>>;
export type IAcoAppOnEntryList<T extends GenericSearchData = GenericSearchData> = (
    entries: SearchRecord<T>[],
    context: AcoContext
) => Promise<SearchRecord<T>[]>;
export type AcoRequestAction = "create" | "update" | "delete" | "move" | "fetch";
export type IAcoAppOnAnyRequest = (context: AcoContext, action: AcoRequestAction) => Promise<void>;

export interface IAcoAppParams {
    name: string;
    apiName: string;
    model: CmsModel;
    fields: CmsModelField[];
    onEntry?: IAcoAppOnEntry;
    onEntryList?: IAcoAppOnEntryList;
    onAnyRequest?: IAcoAppOnAnyRequest;
}

export type IAcoAppsOptions = CreateAcoParams;

export interface IAcoApps {
    list: () => IAcoApp[];
    register: (app: IAcoAppParams) => Promise<IAcoApp>;
}

export type IAcoAppRegisterParams = Omit<IAcoAppParams, "model">;
