import type { ComponentGroup } from "./types";
import { contentSdk } from "./ContentSdk";

export const registerComponentGroup = (group: ComponentGroup) => {
    if (!contentSdk.preview) {
        return;
    }

    contentSdk.preview.registerComponentGroup(group);
};
