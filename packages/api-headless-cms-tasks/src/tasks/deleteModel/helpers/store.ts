import type { IStoreValue } from "~/tasks/deleteModel/types.js";
import type { StorageKey } from "@webiny/db/types.js";

export interface ICreateStoreKeyParams {
    modelId: string;
    tenant: string;
    locale: string;
}

export const createStoreNamespace = (params: Pick<ICreateStoreKeyParams, "tenant" | "locale">) => {
    return `deletingCmsModel#T#${params.tenant}#L#${params.locale}#`;
};

export const createStoreKey = (params: ICreateStoreKeyParams): StorageKey => {
    return `${createStoreNamespace(params)}${params.modelId}`;
};

export const createStoreValue = (params: IStoreValue): IStoreValue => {
    return {
        modelId: params.modelId,
        task: params.task,
        identity: params.identity,
        tenant: params.tenant,
        locale: params.locale
    };
};
