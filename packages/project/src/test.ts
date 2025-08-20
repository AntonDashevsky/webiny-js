import { ProjectSdk } from "./ProjectSdk.js";
import { definitions as extensionDefinitions } from "@webiny/extensions/definitions.js";

const projectSdk = await ProjectSdk.init({
    cwd: process.cwd() + "/../../..",
    extensions: extensionDefinitions
});

process.env.AWS_REGION = "eu-central-1";
const rez = await projectSdk.buildApp({
    app: "admin",
    env: "dev"
});

console.log("rez", rez);
