import { Result } from "@webiny/feature";
import type { Tenant } from "~/types";
import type { GetTenantByIdUseCase as UseCase } from "./abstractions";

export class GetTenantByIdUseCase implements UseCase.Interface {
    constructor(private readonly getTenantById: (id: string) => Promise<Tenant>) {}

    async execute(id: string): UseCase.Result {
        const tenant = await this.getTenantById(id);

        if (!tenant) {
            return Result.fail<UseCase.Error>({ type: "NOT_FOUND" });
        }

        return Result.ok(tenant);
    }
}
