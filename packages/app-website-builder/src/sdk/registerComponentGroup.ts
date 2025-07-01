import type { ComponentGroup } from "./types";
import { contentSdk } from "./ContentSdk";

export const registerComponentGroup = (group: ComponentGroup) => {
    if (!contentSdk.editing) {
        return;
    }

    contentSdk.editing.registerComponentGroup(group);
};
