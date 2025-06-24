import { createImplementation } from "@webiny/di-container";
import { SystemRequirements } from "@webiny/system-requirements";
import { GetNpmVersion} from "~/abstractions";

export class DefaultGetNpmVersion implements GetNpmVersion.Interface {
    execute() {
        return SystemRequirements.getNpmVersion();
    }
}

export const getNpmVersion = createImplementation({
    abstraction: GetNpmVersion,
    implementation: DefaultGetNpmVersion,
    dependencies: []
});
