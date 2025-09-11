import { createFeature } from "@webiny/feature";
import { UpdateTenantRepository, UpdateTenantUseCase } from "./abstractions";
import { UpdateTenantUseCase as UpdateTenantUseCaseImpl } from "./UpdateTenantUseCase";
import { UpdateTenantRepository as UpdateTenantRepositoryImpl } from "./UpdateTenantRepository";
import type { TenancyContext } from "~/types";

export { UpdateTenantUseCase };

export const UpdateTenant = createFeature({
    name: "Tenancy/UpdateTenant",
    abstractions: {
        useCase: UpdateTenantUseCase,
        repository: UpdateTenantRepository
    },
    register(container, context: TenancyContext) {
        // Use-case
        container.register(UpdateTenantUseCaseImpl);

        // Repository
        container.registerFactory(UpdateTenantRepository, () => {
            return new UpdateTenantRepositoryImpl(async (id, data) => {
                await context.tenancy.updateTenant(id, data);
            });
        });
    }
});
