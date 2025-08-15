import { createFeature } from "@webiny/feature";
import { GetCurrentTenantUseCase } from "./abstractions";
import { GetCurrentTenantUseCase as GetCurrentTenantUseCaseImpl } from "./GetCurrentTenantUseCase";
import type { TenancyContext } from "~/types";

export { GetCurrentTenantUseCase };

export const GetCurrentTenant = createFeature({
    name: "GetCurrentTenant",
    abstractions: {
        useCase: GetCurrentTenantUseCase
    },
    register(container, context: TenancyContext) {
        container.registerFactory(GetCurrentTenantUseCase, () => {
            return new GetCurrentTenantUseCaseImpl(() => context.tenancy.getCurrentTenant());
        });
    }
});
