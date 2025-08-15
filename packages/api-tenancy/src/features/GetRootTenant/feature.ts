import { createFeature } from "@webiny/feature";
import { GetRootTenantUseCase } from "./abstractions";
import { GetRootTenantUseCase as GetRootTenantUseCaseImpl } from "./GetRootTenantUseCase";
import type { TenancyContext } from "~/types";

export { GetRootTenantUseCase };

export const GetRootTenant = createFeature({
    name: "GetRootTenant",
    abstractions: {
        useCase: GetRootTenantUseCase
    },
    register(container, context: TenancyContext) {
        container.registerFactory(GetRootTenantUseCase, () => {
            return new GetRootTenantUseCaseImpl(() => context.tenancy.getRootTenant());
        });
    }
});
