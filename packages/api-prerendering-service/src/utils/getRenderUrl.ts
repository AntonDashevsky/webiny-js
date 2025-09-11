import trimEnd from "lodash/trimEnd";
import type { PrerenderingSettings } from "~/types";

export const getRenderUrl = (path: string, settings: PrerenderingSettings) => {
    return [trimEnd(settings.appUrl, "/"), path].join("");
};
