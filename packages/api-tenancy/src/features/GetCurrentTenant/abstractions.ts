import { createAbstraction, type Result } from "@webiny/feature";
import type { Tenant } from "~/types";

export interface IGetCurrentTenantUseCase {
    execute(): Result<Tenant>;
}

export const GetCurrentTenantUseCase =
    createAbstraction<IGetCurrentTenantUseCase>("GetCurrentTenantUseCase");

export namespace GetCurrentTenantUseCase {
    export type Interface = IGetCurrentTenantUseCase;
    export type Result = ReturnType<IGetCurrentTenantUseCase["execute"]>;
}
