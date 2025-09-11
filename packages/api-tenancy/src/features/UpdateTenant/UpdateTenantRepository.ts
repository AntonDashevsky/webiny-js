import type { Tenant } from "~/types.js";
import type { UpdateTenantRepository as Repository } from "./abstractions.js";

export class UpdateTenantRepository implements Repository.Interface {
    constructor(
        private readonly updateTenant: (id: string, data: Partial<Tenant>) => Promise<void>
    ) {}

    async execute({ id, ...data }: Tenant): Repository.Result {
        await this.updateTenant(id, data);
    }
}
