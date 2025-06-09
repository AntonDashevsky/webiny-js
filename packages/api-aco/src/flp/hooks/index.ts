import { onFolderAfterCreateFlpHook } from "./onFolderAfterCreateFlp.hook.js";
import { onFolderAfterDeleteFlpHook } from "./onFolderAfterDeleteFlp.hook.js";
import { onFolderAfterUpdateFlpHook } from "./onFolderAfterUpdateFlp.hook.js";
import { type AcoContext } from "~/types.js";

export const createFlpHooks = (context: AcoContext) => {
    onFolderAfterCreateFlpHook(context);
    onFolderAfterDeleteFlpHook(context);
    onFolderAfterUpdateFlpHook(context);
};
