import { createImplementation } from "@webiny/di-container";
import { SystemRequirements } from "@webiny/system-requirements";
import { GetYarnVersion } from "~/abstractions";

export class DefaultGetYarnVersion implements GetYarnVersion.Interface {
    execute() {
        return SystemRequirements.getYarnVersion();
    }
}

export const getYarnVersion = createImplementation({
    abstraction: GetYarnVersion,
    implementation: DefaultGetYarnVersion,
    dependencies: []
});
