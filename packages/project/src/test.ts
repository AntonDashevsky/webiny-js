import { ProjectSdk } from "./ProjectSdk.js";

const projectSdk = await ProjectSdk.init();

process.env.AWS_REGION = "eu-central-1";

const rez = await projectSdk.getPulumiResourceNamePrefix();

console.log("rez", rez);
