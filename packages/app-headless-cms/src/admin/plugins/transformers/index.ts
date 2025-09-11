import { createDateTransformer } from "./dateTransformer.js";
import { createNumberTransformer } from "./numberTransformer.js";
import { createDynamicZoneTransformer } from "./dynamicZoneTransformer.js";
import { createObjectTransformer } from "./objectTransformer.js";
import type { CmsFieldValueTransformer } from "~/types.js";

export default (): CmsFieldValueTransformer[] => [
    createDateTransformer(),
    createNumberTransformer(),
    createDynamicZoneTransformer(),
    createObjectTransformer()
];
