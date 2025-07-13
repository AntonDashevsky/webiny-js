import { createExtension } from "./createExtension/createExtension.js";
import { ApiAfterDeploy } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const apiAfterDeploy = createExtension<CliCommandParams>({
    type: "Api/AfterDeploy",
    description: "Add custom logic to be executed after the API deployment process.",
    array: true,
    abstraction: ApiAfterDeploy,
});
