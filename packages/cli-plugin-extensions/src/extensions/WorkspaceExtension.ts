import { AbstractExtension } from "./AbstractExtension.js";
import { updateWorkspaces } from "~/utils.js";
import type { ExtensionMessage } from "~/types";

export class WorkspaceExtension extends AbstractExtension {
    async link() {
        await updateWorkspaces(this.params.location);
    }

    getNextSteps(): ExtensionMessage[] {
        return [];
    }
}
