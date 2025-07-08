import { createImplementation } from "@webiny/di-container";
import { GetIsCiService, IsCi } from "~/abstractions/index.js";

export class DefaultIsCi implements IsCi.Interface {
    constructor(private getIsCiService: GetIsCiService.Interface) {}

    execute() {
        return this.getIsCiService.execute();
    }
}

export const isCi = createImplementation({
    abstraction: IsCi,
    implementation: DefaultIsCi,
    dependencies: [GetIsCiService]
});
