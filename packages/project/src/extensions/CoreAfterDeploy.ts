import { createExtension } from "./createExtension/createExtension.js";
import { CoreAfterDeploy } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const coreAfterDeploy = createExtension<CliCommandParams>({
    type: "Core/AfterDeploy",
    scopes: ["project"],
    description: "Add custom logic to be executed after the CORE deployment process.",
    array: true,
    abstraction: CoreAfterDeploy
});
