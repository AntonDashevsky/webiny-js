import { AbstractExtension } from "./AbstractExtension";
import { updateWorkspaces } from "~/utils";
import type { ExtensionMessage } from "~/types";

export class WorkspaceExtension extends AbstractExtension {
    async link() {
        await updateWorkspaces(this.params.location);
    }

    getNextSteps(): ExtensionMessage[] {
        return [];
    }
}
