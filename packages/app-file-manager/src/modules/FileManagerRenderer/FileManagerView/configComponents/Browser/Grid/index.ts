import { ThumbnailConfig } from "./Thumbnail.js";
import { ActionConfig } from "./Action.js";

export interface GridConfig {
    itemThumbnails: ThumbnailConfig[];
    itemActions: ActionConfig[];
}
