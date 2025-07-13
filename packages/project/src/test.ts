import { ProjectSdk } from "./ProjectSdk.js";

const projectSdk = await ProjectSdk.init({
    cwd: process.cwd() + "/../../.."
});

const buildProcesses = await projectSdk.getProjectConfig();

console.log("buildProcesses", await buildProcesses);
