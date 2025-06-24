import { createImplementation } from "@webiny/di-container";
import { SystemRequirements } from "@webiny/system-requirements";
import { GetNpxVersion } from "~/abstractions";

export class DefaultGetNpxVersion implements GetNpxVersion.Interface {
    execute() {
        return SystemRequirements.getNpxVersion();
    }
}

export const getNpxVersion = createImplementation({
    abstraction: GetNpxVersion,
    implementation: DefaultGetNpxVersion,
    dependencies: []
});
