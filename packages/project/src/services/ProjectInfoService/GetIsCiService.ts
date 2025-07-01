import { createImplementation } from "@webiny/di-container";
import { GetIsCiService } from "~/abstractions/index.js";
import { isCI } from "ci-info";

export class DefaultGetIsCiService implements GetIsCiService.Interface {
    execute() {
        return isCI;
    }
}

export const getIsCiService = createImplementation({
    abstraction: GetIsCiService,
    implementation: DefaultGetIsCiService,
    dependencies: []
});
