import trimEnd from "lodash/trimEnd.js";
import { PrerenderingSettings } from "~/types.js";

export const getRenderUrl = (path: string, settings: PrerenderingSettings) => {
    return [trimEnd(settings.appUrl, "/"), path].join("");
};
