import trimEnd from "lodash/trimEnd.js";
import { type PrerenderingSettings } from "~/types.js";

export const getRenderUrl = (path: string, settings: PrerenderingSettings) => {
    return [trimEnd(settings.appUrl, "/"), path].join("");
};
