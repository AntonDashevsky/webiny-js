import { createExtension } from "./createExtension/createExtension.js";
import { ApiBeforeBuild } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const apiBeforeBuild = createExtension<CliCommandParams>({
    type: "Api/BeforeBuild",
    scopes: ["project"],
    description: "Add custom logic to be executed before the API build process.",
    array: true,
    abstraction: ApiBeforeBuild,
});
