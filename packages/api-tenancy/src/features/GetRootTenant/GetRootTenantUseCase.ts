import { Result } from "@webiny/feature";
import type { Tenant } from "~/types";
import type { GetRootTenantUseCase as UseCase } from "./abstractions";

export class GetRootTenantUseCase implements UseCase.Interface {
    constructor(private readonly getRootTenant: () => Promise<Tenant>) {}

    async execute(): UseCase.Result {
        return Result.ok(await this.getRootTenant());
    }
}
