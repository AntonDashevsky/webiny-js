import { createExtension } from "./createExtension/createExtension.js";
import { ApiAfterBuild } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const apiAfterBuild = createExtension<CliCommandParams>({
    type: "Api/AfterBuild",
    scopes: ["project"],
    description: "Add custom logic to be executed after the API build process.",
    array: true,
    abstraction: ApiAfterBuild,
});
