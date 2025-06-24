import { createImplementation } from "@webiny/di-container";
import { GetIsCi } from "~/abstractions";
import { isCI } from "ci-info";

export class DefaultGetIsCi implements GetIsCi.Interface {
    execute() {
        return isCI;
    }
}

export const getIsCi = createImplementation({
    abstraction: GetIsCi,
    implementation: DefaultGetIsCi,
    dependencies: []
});
