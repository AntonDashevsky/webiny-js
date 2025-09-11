import type { PbContext } from "@webiny/api-page-builder/types";
import type { ContextPlugin } from "@webiny/api";
import type { FormBuilderContext } from "~/types";

import afterFormPublish from "./afterFormPublish";
import afterFormDelete from "./afterFormDelete";
import afterFormRevisionDelete from "./afterFormRevisionDelete";

export default (): ContextPlugin<FormBuilderContext & PbContext>[] => {
    return [afterFormPublish(), afterFormDelete(), afterFormRevisionDelete()];
};
