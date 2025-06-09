import { ContextPlugin } from "@webiny/api";
import { type PbContext } from "@webiny/api-page-builder/types.js";
import { type FormBuilderContext } from "~/types.js";

export default () => {
    return new ContextPlugin<FormBuilderContext & PbContext>(
        async ({ formBuilder, pageBuilder }) => {
            /**
             * If there are published pages that include the form revision
             * that was deleted, we need to rerender them.
             */
            formBuilder.onFormRevisionAfterDelete.subscribe(async ({ form }) => {
                await pageBuilder.prerendering.render({
                    tags: [{ tag: { key: "fb-form-revision", value: form.id } }]
                });
            });
        }
    );
};
