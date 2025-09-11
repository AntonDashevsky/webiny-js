import { createDateTransformer } from "./dateTransformer";
import { createNumberTransformer } from "./numberTransformer";
import { createDynamicZoneTransformer } from "./dynamicZoneTransformer";
import { createObjectTransformer } from "./objectTransformer";
import type { CmsFieldValueTransformer } from "~/types";

export default (): CmsFieldValueTransformer[] => [
    createDateTransformer(),
    createNumberTransformer(),
    createDynamicZoneTransformer(),
    createObjectTransformer()
];
