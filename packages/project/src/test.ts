import { ProjectSdk } from "./ProjectSdk.js";
import { definitions as extensionDefinitions } from "@webiny/extensions/definitions.js";

const projectSdk = await ProjectSdk.init({
    cwd: process.cwd() + "/../../..",
    extensions: extensionDefinitions
});

process.env.AWS_REGION = "eu-central-1";
await projectSdk.buildApp({
    app: "api",
    env: "dev"
});
