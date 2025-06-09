import afterMenuUpdate from "./afterMenuUpdate.js";
import afterPageBlockUpdate from "./afterPageBlockUpdate.js";
import afterPageDelete from "./afterPageDelete.js";
import afterPagePublish from "./afterPagePublish.js";
import afterPageUnpublish from "./afterPageUnpublish.js";
import afterSettingsUpdate from "./afterSettingsUpdate.js";
import { type PbContext } from "~/graphql/types.js";
import { type ContextPlugin } from "@webiny/api";

export default (): ContextPlugin<PbContext>[] => {
    return [
        afterMenuUpdate(),
        afterPageBlockUpdate(),
        afterPageDelete(),
        afterPagePublish(),
        afterPageUnpublish(),
        afterSettingsUpdate()
    ];
};
