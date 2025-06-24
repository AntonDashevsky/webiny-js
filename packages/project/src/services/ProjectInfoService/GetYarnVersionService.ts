import { createImplementation } from "@webiny/di-container";
import { SystemRequirements } from "@webiny/system-requirements";
import { GetYarnVersionService } from "~/abstractions";

export class DefaultGetYarnVersionService implements GetYarnVersionService.Interface {
    execute() {
        return SystemRequirements.getYarnVersion();
    }
}

export const getYarnVersionService = createImplementation({
    abstraction: GetYarnVersionService,
    implementation: DefaultGetYarnVersionService,
    dependencies: []
});
