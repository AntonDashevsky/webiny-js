import { createExtension } from "./createExtension/createExtension.js";
import { ApiBeforeDeploy } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const apiBeforeDeploy = createExtension<CliCommandParams>({
    type: "Api/BeforeDeploy",
    scopes: ["project"],
    description: "Add custom logic to be executed before the API deployment process.",
    array: true,
    abstraction: ApiBeforeDeploy,
});
