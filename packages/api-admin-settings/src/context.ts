import { ContextPlugin } from "@webiny/handler";
import { type AdminSettingsContext } from "~/types.js";
import { createStorageOperations } from "~/storage/index.js";
import { createSettingsService } from "~/services/settings.js";

export const createContext = () => {
    return new ContextPlugin<AdminSettingsContext>(async context => {
        /**
         * Storage operations should be created from the outside and passed into the context creation.
         * // TODO refactor at some point
         */
        const storageOperations = await createStorageOperations({
            /**
             * Should use some global client, not the one from context.db.driver.
             */
            // @ts-expect-error
            documentClient: context.db.driver.documentClient
        });

        context.settings = await createSettingsService({
            context,
            storageOperations
        });
    });
};
