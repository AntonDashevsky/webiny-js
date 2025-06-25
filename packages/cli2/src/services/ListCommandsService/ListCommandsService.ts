import { createImplementation } from "@webiny/di-container";
import { ListCommandsService } from "~/abstractions";
import { ProjectSdk } from "@webiny/project";

export class DefaultListCommandsService implements ListCommandsService.Interface {
    execute() {
        return ProjectSdk.init(cwd);
    }
}

export const listCommandsService = createImplementation({
    abstraction: ListCommandsService,
    implementation: DefaultListCommandsService,
    dependencies: [Cli]
});
