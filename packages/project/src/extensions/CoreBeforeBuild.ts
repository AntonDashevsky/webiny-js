import { createExtension } from "./createExtension/createExtension.js";
import { CoreBeforeBuild } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const coreBeforeBuild = createExtension<CliCommandParams>({
    type: "Core/BeforeBuild",
    scopes: ["project"],
    description: "Add custom logic to be executed before the CORE build process.",
    array: true,
    abstraction: CoreBeforeBuild,
});
