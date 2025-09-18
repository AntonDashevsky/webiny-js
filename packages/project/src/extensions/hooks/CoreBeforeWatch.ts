import { defineExtension } from "~/defineExtension/index.js";
import { zodPathToAbstraction } from "~/defineExtension/zodTypes/zodPathToAbstraction.js";
import { CoreBeforeWatch } from "~/abstractions/index.js";
import { z } from "zod";

export const coreBeforeWatch = defineExtension({
    type: "Core/BeforeWatch",
    tags: { runtimeContext: "project", application: "core" },
    description: "Add custom logic to be executed before the CORE watch process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(CoreBeforeWatch, project)
        });
    }
});
