import { createAbstraction, type Result } from "@webiny/feature";
import type { Tenant } from "~/types";

export interface IGetRootTenantUseCase {
    execute(): Promise<Result<Tenant>>;
}

export const GetRootTenantUseCase =
    createAbstraction<IGetRootTenantUseCase>("GetRootTenantUseCase");

export namespace GetRootTenantUseCase {
    export type Interface = IGetRootTenantUseCase;
    export type Result = ReturnType<IGetRootTenantUseCase["execute"]>;
}
