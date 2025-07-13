import { createExtension } from "./createExtension/createExtension.js";
import { ApiBeforeBuild } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const apiBeforeBuild = createExtension<CliCommandParams>({
    type: "Api/BeforeBuild",
    description: "Add custom logic to be executed before the API build process.",
    array: true,
    abstraction: ApiBeforeBuild,
});
