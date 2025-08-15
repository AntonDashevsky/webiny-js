import { Result } from "@webiny/feature";
import type { Tenant } from "~/types";
import type { GetCurrentTenantUseCase as UseCase } from "./abstractions";

export class GetCurrentTenantUseCase implements UseCase.Interface {
    constructor(private readonly getCurrentTenant: () => Tenant) {}

    execute(): UseCase.Result {
        return Result.ok(this.getCurrentTenant());
    }
}
