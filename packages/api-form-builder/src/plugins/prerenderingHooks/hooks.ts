import { type PbContext } from "@webiny/api-page-builder/types.js";
import { type ContextPlugin } from "@webiny/api";
import { type FormBuilderContext } from "~/types.js";

import afterFormPublish from "./afterFormPublish.js";
import afterFormDelete from "./afterFormDelete.js";
import afterFormRevisionDelete from "./afterFormRevisionDelete.js";

export default (): ContextPlugin<FormBuilderContext & PbContext>[] => {
    return [afterFormPublish(), afterFormDelete(), afterFormRevisionDelete()];
};
