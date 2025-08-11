import { createExtension } from "./createExtension/createExtension.js";
import { CoreBeforeDeploy } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const coreBeforeDeploy = createExtension<CliCommandParams>({
    type: "Core/BeforeDeploy",
    scopes: ["project"],
    description: "Add custom logic to be executed before the CORE deployment process.",
    array: true,
    abstraction: CoreBeforeDeploy,
});
