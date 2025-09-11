import type { ThumbnailConfig } from "./Thumbnail";
import type { ActionConfig } from "./Action";

export interface GridConfig {
    itemThumbnails: ThumbnailConfig[];
    itemActions: ActionConfig[];
}
