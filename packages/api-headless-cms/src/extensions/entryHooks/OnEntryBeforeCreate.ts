import { defineExtension, zodPathToAbstraction } from "@webiny/project/extensions/index.js";
import { OnEntryBeforeCreate } from "~/abstractions/index.js";
import { z } from "zod";

export const onEntryBeforeCreate = defineExtension({
    type: "Cms/Entry/OnEntryBeforeCreate",
    tags: { runtimeContext: "app-build", appName: "api" },
    description: "Add custom logic to be executed before the CMS entry is created.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(OnEntryBeforeCreate, project)
        });
    }
});
