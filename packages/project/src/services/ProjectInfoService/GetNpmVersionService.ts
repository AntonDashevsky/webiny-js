import { createImplementation } from "@webiny/di-container";
import { SystemRequirements } from "@webiny/system-requirements";
import { GetNpmVersionService } from "~/abstractions/index.js";

export class DefaultGetNpmVersionService implements GetNpmVersionService.Interface {
    execute() {
        return SystemRequirements.getNpmVersion();
    }
}

export const getNpmVersionService = createImplementation({
    abstraction: GetNpmVersionService,
    implementation: DefaultGetNpmVersionService,
    dependencies: []
});
