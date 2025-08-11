import { createExtension } from "./createExtension/createExtension.js";
import { CoreAfterBuild } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const coreAfterBuild = createExtension<CliCommandParams>({
    type: "Core/AfterBuild",
    scopes: ["project"],
    description: "Add custom logic to be executed after the CORE build process.",
    array: true,
    abstraction: CoreAfterBuild,
});
