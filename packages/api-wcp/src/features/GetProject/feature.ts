import { createFeature } from "@webiny/feature";
import type { WcpContext } from "~/types";
import { GetProjectUseCase as GetProjectUseCaseImpl } from "./GetProjectUseCase";
import { GetProjectUseCase } from "./abstractions";

export { GetProjectUseCase };

export const GetProject = createFeature({
    name: "Wcp/GetProject",
    abstractions: {
        useCase: GetProjectUseCase
    },
    register(container, context: WcpContext) {
        container.registerFactory(GetProjectUseCase, () => {
            return new GetProjectUseCaseImpl(() => context.wcp.getProject());
        });
    }
});
