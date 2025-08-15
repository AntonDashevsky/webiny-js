import { createFeature } from "@webiny/feature";
import { GetTenantByIdUseCase } from "./abstractions";
import { GetTenantByIdUseCase as GetTenantByIdUseCaseImpl } from "./GetTenantByIdUseCase";
import type { TenancyContext } from "~/types";

export { GetTenantByIdUseCase };

export const GetTenantById = createFeature({
    name: "GetTenantById",
    abstractions: {
        useCase: GetTenantByIdUseCase
    },
    register(container, context: TenancyContext) {
        container.registerFactory(GetTenantByIdUseCase, () => {
            return new GetTenantByIdUseCaseImpl((id: string) => context.tenancy.getTenantById(id));
        });
    }
});
